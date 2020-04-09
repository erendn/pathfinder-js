function Grid() {
    this.row = 19;
    this.col = 50;
    this.size = 0;
    this.solving = false;
    this.startCount = 0;
    this.finishCount = 0;
}

Grid.prototype.init = function () {
    this.parent = document.getElementById('grid');
    for (i = 0; i < this.row; i++) {
        for (j = 0; j < this.col; j++) {
            child = document.createElement('div');
            child.setAttribute('class', 'cell');
            inside = document.createElement('div');
            inside.setAttribute('class', 'cell-inside');
            inside.setAttribute('id', 'cell-' + i + '-' + j);
            child.appendChild(inside);
            this.parent.appendChild(child);
        }
    }
    this.cells = this.createCells();
}

Grid.prototype.createCells = function () {
    cells = [];
    for (i = 0; i < this.row; i++) {
        cells[i] = [];
        for (j = 0; j < this.col; j++) {
            cells[i][j] = new Cell(i, j);
        }
    }
    return cells;
}

Grid.prototype.clear = function (onlyAnimate) {
    for (i = 0; i < this.row; i++) {
        for (j = 0; j < this.col; j++) {
            this.cells[i][j].setAnimate('none');
            if (!onlyAnimate)
                this.cells[i][j].setType('empty');
        }
    }
}

Grid.prototype.solve = function () {
    if (this.startCount == 0)
        alert("There must be a start point.");
    else if (this.finishCount == 0)
        alert("There must be a finish point.");
    else {
        menu = document.getElementById('algorithm-menu');
        selectedAlgo = menu.options[menu.selectedIndex].value;
        algo = null;
        if (selectedAlgo == "dijkstra") {
            algo = new Dijkstra();
        } else if (selectedAlgo == "a*") {
            algo = new Astar();
        } else {
            alert("Error! Chosen algorithm is not implemented.");
        }
        this.clear(true);
        algo.solve();
    }
}

Grid.prototype.createMaze = async function () {
    for (i = 0; i < this.row; i++) {
        for (j = 0; j < this.col; j++) {
            this.cells[i][j].setType(i % 2 == 0 && j % 2 == 0 ? 'unconnected' : 'wall');
            this.cells[i][j].setAnimate('none');
        }
    }
    unconnected = [this.cells[parseInt(Math.random() * parseInt(this.row / 2)) * 2][parseInt(Math.random() * parseInt(this.col / 2)) * 2]];
    while (unconnected.length > 0) {
        cell = unconnected.splice(parseInt(Math.random() * unconnected.length), 1)[0];
        cell.setType('empty');
        connected = [];
        for (i = 0; i < 2; i++) {
            for (j = -2; j <= 2; j += 4) {
                row = cell.row + (i == 0 ? 0 : j);
                col = cell.col + (i == 0 ? j : 0);
                if (this.isInMaze(row, col)) {
                    if (this.cells[row][col].type == 'unconnected') {
                        if (!unconnected.includes(this.cells[row][col])) {
                            unconnected.push(this.cells[row][col]);
                        }
                    } else {
                        connected.push(this.cells[row][col]);
                    }
                }
            }
        }
        if (connected.length > 0) {
            neighbour = connected[parseInt(Math.random() * connected.length)];
            this.cells[(cell.row + neighbour.row) / 2][(cell.col + neighbour.col) / 2].setType('empty');
        }
    }
    this.cells[0][0].setType('start');
    this.cells[this.row - 1][this.col - 1].setType('finish');
}

Grid.prototype.isInMaze = function (row, col) {
    return row >= 0 && row < this.row && col >= 0 && col < this.col;
}

let Maze = new Grid();
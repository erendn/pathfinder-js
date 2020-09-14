function Grid() {
    this.row = 19;
    this.col = 50;
    this.size = 0;
    this.solving = false;
    this.startCount = 0;
    this.finishCount = 0;
    this.checkpointCount = 0;
}

/**
 * Creates and appends grid cells to the page.
 */
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

/**
 * Creates cell objects according to the row and column sizes.
 */
Grid.prototype.createCells = function () {
    var cells = [];
    for (var i = 0; i < this.row; i++) {
        cells[i] = [];
        for (var j = 0; j < this.col; j++) {
            cells[i][j] = new Cell(i, j);
        }
    }
    return cells;
}

/**
 * Sets the animate attribute of all cells to 'empty'.
 * @param {*} onlyAnimate 
 */
Grid.prototype.clear = function (onlyAnimate) {
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.cells[i][j].setAnimate('none');
            if (!onlyAnimate)
                this.cells[i][j].setType('empty');
        }
    }
}

/**
 * Calls the solve function of the selected pathfinding algorithm.
 */
Grid.prototype.solve = function () {
    if (this.startCount == 0)
        alert("There must be a start point.");
    else if (this.finishCount == 0)
        alert("There must be a finish point.");
    else {
        var menu = document.getElementById('algorithm-menu');
        var selectedAlgo = menu.options[menu.selectedIndex].value;
        var algo = null;
        if (selectedAlgo == "dijkstra") {
            algo = new Dijkstra();
        } else if (selectedAlgo == "a*") {
            algo = new Astar();
        } else if (selectedAlgo == "d*") {
            algo = new Dstar();
        } else if (selectedAlgo == "bfs") {
            algo = new BFS();
        } else if (selectedAlgo == "dfs") {
            algo = new DFS();
        } else {
            alert("Error! Chosen algorithm is not implemented.");
        }
        this.clear(true);
        algo.solve();
    }
}

/**
 * Creates a random maze on the grid.
 */
Grid.prototype.createMaze = async function () {
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.cells[i][j].setType(i % 2 == 0 && j % 2 == 0 ? 'unconnected' : 'wall');
            this.cells[i][j].setAnimate('none');
        }
    }
    var unconnected = [this.cells[parseInt(Math.random() * parseInt(this.row / 2)) * 2][parseInt(Math.random() * parseInt(this.col / 2)) * 2]];
    while (unconnected.length > 0) {
        var cell = unconnected.splice(parseInt(Math.random() * unconnected.length), 1)[0];
        cell.setType('empty');
        var connected = [];
        for (var i = 0; i < 2; i++) {
            for (var j = -2; j <= 2; j += 4) {
                var row = cell.row + (i == 0 ? 0 : j);
                var col = cell.col + (i == 0 ? j : 0);
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
            var neighbour = connected[parseInt(Math.random() * connected.length)];
            this.cells[(cell.row + neighbour.row) / 2][(cell.col + neighbour.col) / 2].setType('empty');
        }
    }
    this.cells[0][0].setType('start');
    this.cells[this.row - 1][this.col - 1].setType('finish');
}

/**
 * Checks if a cell is in the maze. Used to prevent "Out Of Bounds" errors.
 * @param {*} row 
 * @param {*} col 
 */
Grid.prototype.isInMaze = function (row, col) {
    return row >= 0 && row < this.row && col >= 0 && col < this.col;
}

/**
 * Updates the checkpoint texts. When a checkpoint is deleted, added or updated other checkpoints might change.
 * @param {*} start 
 */
Grid.prototype.updateCheckpoints = function (start) {
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            var cell = this.cells[i][j];
            if (cell.type.startsWith('checkpoint') && parseInt(cell.type.substring(11)) > start) {
                cell.type = 'checkpoint-' + (parseInt(cell.type.substring(11)) - 1);
                cell.cell.innerHTML = "C" + cell.type.substring(11);
            }
        }
    }
}

let Maze = new Grid();
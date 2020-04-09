function Cell(row, col) {
    this.row = row;
    this.col = col;
    this.cell = document.getElementById('cell-' + row + '-' + col);
    this.type = 'empty';
    this.animate = 'none';
}

Cell.prototype.setType = function (type) {
    if ((type != 'start' && type != 'finish') || (type == 'start' && Maze.startCount == 0) || (type == 'finish' && !Maze.finishCount)) {
        if (this.type == 'start')
            Maze.startCount--;
        if (this.type == 'finish')
            Maze.finishCount--;
        this.type = type;
        this.updateColor();
        if (type == 'start')
            Maze.startCount++;
        if (type == 'finish')
            Maze.finishCount++;
    }
}

Cell.prototype.setAnimate = function (animate) {
    this.animate = animate;
    this.updateColor();
}

Cell.prototype.updateColor = function () {
    if (this.type == 'wall') {
        this.cell.style.backgroundColor = wallColor;
    } else if (this.type == 'start') {
        this.cell.style.backgroundColor = startColor;
    } else if (this.type == 'finish') {
        this.cell.style.backgroundColor = finishColor;
    }else{
        this.cell.style.backgroundColor = emptyColor;
    }
    if (this.type != 'start' && this.type != 'finish') {
        if (this.animate == 'search')
            this.cell.style.backgroundColor = searchColor;
        else if (this.animate == 'found')
            this.cell.style.backgroundColor = foundColor;
        else if (this.animate == 'reveal')
            this.cell.style.backgroundColor = revealColor;
    }
}

let emptyColor = '#d1d1d1';
let wallColor = '#636363';
let startColor = '#fc473a';
let finishColor = '#43a827';
let searchColor = '#34b7eb';
let foundColor = '#043a8a';
let revealColor = '#cccc16';
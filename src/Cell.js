function Cell(row, col) {
    this.row = row;
    this.col = col;
    this.cell = document.getElementById('cell-' + row + '-' + col);
    this.type = 'empty';
    this.animate = 'none';
}

/**
 * Sets the type attribute. Also updates the background color of the cell.
 * @param {*} type 
 */
Cell.prototype.setType = function (type) {
    if ((type != 'start' && type != 'finish') || (type == 'start' && !Maze.startCount) || (type == 'finish' && !Maze.finishCount)) {
        if (this.type == 'start')
            Maze.startCount--;
        if (this.type == 'finish')
            Maze.finishCount--;
        if (this.type.startsWith('checkpoint')) {
            Maze.updateCheckpoints(parseInt(this.type.substring(11)));
            Maze.checkpointCount--;
            this.cell.innerHTML = "";
        }
        this.type = type;
        this.updateColor();
        if (type == 'start')
            Maze.startCount++;
        if (type == 'finish')
            Maze.finishCount++;
        if (type == 'checkpoint') {
            Maze.checkpointCount++;
            this.type = "checkpoint-" + Maze.checkpointCount;
            this.cell.innerHTML = "C" + Maze.checkpointCount;
        }
    }
}

/**
 * Sets the animate attribute. Also updates the background color of the cell.
 * @param {*} animate 
 */
Cell.prototype.setAnimate = function (animate) {
    this.animate = animate;
    this.updateColor();
}

/**
 * Updates the background color of the cell according to its type and animate attributes.
 */
Cell.prototype.updateColor = function () {
    if (this.type == 'wall') {
        this.cell.style.backgroundColor = wallColor;
    } else if (this.type == 'start') {
        this.cell.style.backgroundColor = startColor;
    } else if (this.type == 'finish') {
        this.cell.style.backgroundColor = finishColor;
    } else if (this.type.startsWith('checkpoint')) {
        this.cell.style.backgroundColor = checkpointColor;
    } else {
        this.cell.style.backgroundColor = emptyColor;
    }
    if (this.type != 'start' && this.type != 'finish' && !this.type.startsWith('checkpoint')) {
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
let checkpointColor = '#ad22d4';
let searchColor = '#34b7eb';
let foundColor = '#043a8a';
let revealColor = '#cccc16';
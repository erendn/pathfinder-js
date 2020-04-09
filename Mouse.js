function MouseHandler() {
    this.x = 0;
    this.y = 0;
    this.pressed = false;
    document.onmousemove = mouseMove;
    document.onmousedown = mouseDown;
    document.onmouseup = mouseUp;
}

MouseHandler.prototype.trigger = function () {
    Maze.size = Maze.cells[0][0].cell.offsetWidth;
    if (!Maze.solving && this.y > 0 && this.y < Maze.size * Maze.cells.length) {
        Maze.cells[Math.floor(this.y / Maze.size)][Math.floor(this.x / Maze.size)].setType(checkedRadio());
    }

}

function checkedRadio(){
    if(document.getElementById('wall').checked)
        return 'wall';
    if(document.getElementById('start').checked)
        return 'start';
    if(document.getElementById('finish').checked)
        return 'finish';
    return 'empty';    
}

function mouseMove(event) {
    Mouse.x = event.pageX - Maze.parent.getBoundingClientRect().x;
    Mouse.y = event.pageY - Maze.parent.getBoundingClientRect().y;
    if (Mouse.pressed)
        Mouse.trigger();
}

function mouseDown(event) {
    Mouse.pressed = true;
    Mouse.trigger();
}

function mouseUp(event) {
    Mouse.pressed = false;
}

let Mouse = new MouseHandler();
function Astar() {
    this.table = [];
    for (i = 0, size = Maze.row * Maze.col; i < size; i++) {
        this.table.push(new Node(parseInt(i / Maze.col), i % Maze.col));
        if (Maze.cells[parseInt(i / Maze.col)][i % Maze.col].type == 'start')
            this.start = i;
        else if (Maze.cells[parseInt(i / Maze.col)][i % Maze.col].type == 'finish')
            this.finish = i;
    }
    this.table[this.start].distance = 0;
    this.next = new Queue();
    this.next.enqueue(this.table[this.start]);
}

Astar.prototype.solve = async function () {
    diagonal = document.getElementById('diagonal').checked;
    while (this.next.list.length > 0) {
        current = this.next.dequeue();
        current.found = true;
        if (Maze.cells[current.row][current.col].type == 'finish') {
            break;
        }
        Maze.cells[current.row][current.col].setAnimate('found');
        for (x = -1; x < 2; x++) {
            for (j = -1; j < 2; j++) {
                if (diagonal || Math.abs(x) != Math.abs(j)) {
                    row = current.row + x;
                    col = current.col + j;
                    if (Maze.isInMaze(row, col) && !this.table[row * Maze.col + col].found && Maze.cells[row][col].type != 'wall') {
                        if(this.table[row * Maze.col + col].distance == null){
                            this.table[row * Maze.col + col].g = Math.hypot(row - this.table[this.start].row, col - this.table[this.start].col);
                            this.table[row * Maze.col + col].h = Math.hypot(row - this.table[this.finish].row, col - this.table[this.finish].col);
                            this.table[row * Maze.col + col].distance = this.table[row * Maze.col + col].g + this.table[row * Maze.col + col].h;
                            this.table[row * Maze.col + col].prev = current;
                            this.next.enqueue(this.table[row * Maze.col + col]);
                            Maze.cells[row][col].setAnimate('search');
                        }
                    }
                }
            }
        }
        speed = document.getElementById('speed').value;
        if (speed > 0)
            await new Promise(r => setTimeout(r, speed));
    }
    current = this.table[this.finish];
    while (current.prev != null) {
        if (Maze.cells[current.row][current.col].type != 'start' && Maze.cells[current.row][current.col].type != 'finish') {
            Maze.cells[current.row][current.col].setAnimate('reveal');
        }
        current = current.prev;
    }
}
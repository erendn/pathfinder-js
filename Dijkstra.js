function Dijkstra() {
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

Dijkstra.prototype.solve = async function () {
    diagonal = document.getElementById('diagonal').checked;
    while (this.next.list.length > 0) {
        current = this.next.dequeue();
        current.found = true;
        if (Maze.cells[current.row][current.col].type == 'finish') {
            break;
        }
        Maze.cells[current.row][current.col].setAnimate('found');
        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                if (diagonal || Math.abs(i) != Math.abs(j)) {
                    row = current.row + i;
                    col = current.col + j;
                    if (Maze.isInMaze(row, col) && !this.table[row * Maze.col + col].found && Maze.cells[row][col].type != 'wall') {
                        if (this.table[row * Maze.col + col].distance == null || this.table[row * Maze.col + col].distance > current.distance + Math.hypot(i, j)) {
                            this.table[row * Maze.col + col].distance = current.distance + Math.hypot(i, j);
                            this.table[row * Maze.col + col].prev = current;
                            this.next.enqueue(this.table[row * Maze.col + col]);
                            Maze.cells[row][col].setAnimate('search');
                        }
                    }
                }
            }
        }
        speed = document.getElementById('speed').value;
        if(speed > 0)
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
class Astar extends Algorithm {

    constructor() {
        super();
    }

    async solve() {
        var diagonal = document.getElementById('diagonal').checked;
        while (this.finish.length >= 2) {
            this.start = this.finish.splice(0, 1)[0];
            for (var y = 0; y < this.table.length; y++) {
                this.table[y].found = false;
                this.table[y].distance = null;
                this.table[y].prev = null;
            }
            this.table[this.start].distance = 0;
            this.next = new Queue();
            this.next.enqueue(this.table[this.start]);
            while (this.next.list.length > 0) {
                var current = this.next.dequeue();
                current.found = true;
                if (current.row * Maze.col + current.col == this.finish[0]) {
                    break;
                }
                Maze.cells[current.row][current.col].setAnimate('found');
                for (var i = -1; i < 2; i++) {
                    for (var j = -1; j < 2; j++) {
                        if (diagonal || Math.abs(i) != Math.abs(j)) {
                            var row = current.row + i;
                            var col = current.col + j;
                            if (Maze.isInMaze(row, col) && !this.table[row * Maze.col + col].found && Maze.cells[row][col].type != 'wall') {
                                var gcost = current.gcost + Math.hypot(row - current.row, col - current.col);
                                if (this.table[row * Maze.col + col].distance == null || this.table[row * Maze.col + col].gcost > gcost) {
                                    this.table[row * Maze.col + col].gcost = gcost;
                                    this.table[row * Maze.col + col].hcost = Math.hypot(row - this.table[this.finish[0]].row, col - this.table[this.finish[0]].col);
                                    this.table[row * Maze.col + col].distance = this.table[row * Maze.col + col].gcost + this.table[row * Maze.col + col].hcost;
                                    this.table[row * Maze.col + col].prev = current;
                                    this.next.enqueue(this.table[row * Maze.col + col]);
                                    Maze.cells[row][col].setAnimate('search');
                                }
                            }
                        }
                    }
                }
                var speed = document.getElementById('speed').value;
                if (speed > 0)
                    await new Promise(r => setTimeout(r, 100 - speed));
            }
            current = this.table[this.finish[0]];
            var currentPath = [];
            while (current.prev != null) {
                currentPath.push(current);
                current = current.prev;
            }
            this.path = this.path.concat(currentPath.reverse());
        }
        for (var i = 0; i < this.path.length; i++) {
            var currentType = Maze.cells[this.path[i].row][this.path[i].col].type;
            if (currentType != 'start' && currentType != 'finish' && !currentType.startsWith('checkpoint')) {
                Maze.cells[this.path[i].row][this.path[i].col].setAnimate('reveal');
            }
        }
    }

}
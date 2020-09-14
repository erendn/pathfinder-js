class Algorithm {

    constructor() {
        this.table = [];
        this.finish = Array(Maze.checkpointCount + 2).fill(null, 0, Maze.checkpointCount + 2);
        for (var i = 0, size = Maze.row * Maze.col; i < size; i++) {
            this.table.push(new Node(parseInt(i / Maze.col), i % Maze.col));
            if (Maze.cells[parseInt(i / Maze.col)][i % Maze.col].type == 'start')
                this.finish.splice(1, 1, i);
            else if (Maze.cells[parseInt(i / Maze.col)][i % Maze.col].type == 'finish')
                this.finish.splice(0, 1, i);
            else if (Maze.cells[parseInt(i / Maze.col)][i % Maze.col].type.startsWith('checkpoint'))
                this.finish.splice(parseInt(Maze.cells[parseInt(i / Maze.col)][i % Maze.col].type.substring(11)) + 1, 1, i);
        }
        this.finish.push(this.finish.splice(0, 1)[0]);
        this.path = [];
    }

}
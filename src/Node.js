function Node(row, col) {
    this.row = row;
    this.col = col;
    this.found = false;
    this.gcost = null;
    this.hcost = null;
    this.distance = null;
    this.prev = null;
}
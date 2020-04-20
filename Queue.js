function Queue() {
    this.list = [];
}

Queue.prototype.enqueue = function (node) {
    if (this.list.length == 0) {
        this.list.push(node);
        return;
    }
    var index = this.list.indexOf(node);
    if (index != -1) {
        this.list.splice(index, 1);
    }
    for (index = 0; index < this.list.length; index++) {
        if (node.distance < this.list[index].distance) {
            this.list.splice(index, 0, node);
            return;
        } else if (node.distance == this.list[index].distance && node.h < this.list[index].h) {
            this.list.splice(index, 0, node);
            return;
        } else if (index == this.list.length - 1) {
            this.list.push(node);
            return;
        }
    }
}

Queue.prototype.dequeue = function () {
    return this.list.splice(0, 1)[0];
}
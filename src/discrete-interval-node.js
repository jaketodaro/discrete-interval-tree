class DiscreteIntervalNode {
  constructor(start, end, parent) {
    this.interval = new Interval(start, end);

    this.parent = parent;

    this.left = null;
    this.right = null;
  }

  contains(start, end) {
    if (this.interval.contains(start) && this.interval.contains(end)) {
      return true;
    } else if (this.left && end < this.interval.start) {
      return this.left.contains.apply(this.left, arguments);
    } else if (this.right && start > this.interval.end) {
      return this.right.contains.apply(this.right, arguments);
    } else {
      return false;
    }
  }

  isLeaf() {
    return !this.left && !this.right;
  }

  hasOneChild() {
    return (this.left && !this.right) || (!this.left && this.right);
  }

  getLeftMostLeaf() {
    return this.left ? this.left.getRightMostLeaf() : this;
  }

  getRightMostLeaf() {
    return this.right ? this.right.getRightMostLeaf() : this;
  }

  absorbLeft(node) {
    this.interval.start = node.interval.start;
    this.left = node.left;

    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  absorbRight(node) {
    this.interval.end = node.interval.end;
    this.right = node.right;

    if (this.right) {
      this.right.parent = this;
    }

    return this;
  }
}

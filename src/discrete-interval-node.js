class DiscreteIntervalNode {
  constructor(start, end) {
    this.interval = new Interval(start, end);

    this.left = null;
    this.right = null;
  }

  absorbLeft(node) {
    this.interval.start = node.interval.start;
    this.left = node.left;

    return this;
  }

  absorbRight(node) {
    this.interval.end = node.interval.end;
    this.right = node.right;

    return this;
  }
}

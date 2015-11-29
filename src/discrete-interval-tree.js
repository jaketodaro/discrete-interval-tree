class DiscreteIntervalTree {
  constructor() {
    this.root = null;
  }

  add(start, end) {
    end = typeof end === 'number' ? end : start;

    if (!this.root) {
      return this.root = new DiscreteIntervalNode(start, end);
    }

    return this.addValue(start).absorbRight(this.addValue(end));
  }

  addValue(value) {
    var curr = this.root;
    var valueNode = null;

    while(!valueNode) {
      if (curr.interval.isGreaterThan(value)) {
        // value is somewhere to the left

        if (curr.left) {
          curr = curr.left;
        } else {
          valueNode = curr.left = new DiscreteIntervalNode(value, value);
        }
      } else if (curr.interval.bordersStart(value)) {
        // value borders left

        if (curr.left && value === curr.left.interval.end + 1) {
          // absorb left child
          valueNode = curr.absorbLeft(curr.left);
        } else {
          // just extend 1 to the left
          curr.interval.start = value;
          valueNode === curr;
        }
      } else if (curr.interval.contains(value)) {
        // value is contained in existing interval

        valueNode = curr;
      } else if (curr.interval.bordersEnd(value)) {
        // value borders right

        if (curr.right && value === curr.right.interval.start - 1) {
          // absorb right child
          valueNode = curr.absorbRight(curr.right);
        } else {
          // just extend 1 to the right
          curr.interval.end = value;
          valueNode = curr;
        }
      } else if (curr.interval.isLessThan(value)){

        // value is somewhere to the right
        if (curr.right) {
          curr = curr.right;
        } else {
          valueNode = curr.right = new DiscreteIntervalNode(value, value);
        }
      }
    }

    return valueNode;
  }
};

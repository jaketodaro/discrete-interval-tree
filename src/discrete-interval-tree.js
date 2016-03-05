class DiscreteIntervalTree {
  constructor() {
    this.root = null;
  }

  contains(start, end) {
    end = typeof end === 'number' ? end : start;

    if (!this.root) {
      return false;
    }

    return this.root.contains(start, end);
  }

  getIntervals() {
    const intervals = [];

    if (this.root) {
      this.root.inOrderTraverse(function() {
        intervals.push(this.interval);
      });
    }

    return intervals;
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
      if (value < curr.interval.start - 1) {
        // value is somewhere to the left

        if (curr.left) {
          curr = curr.left;
        } else {
          valueNode = curr.left = new DiscreteIntervalNode(value, value, curr);
        }
      } else if (value === curr.interval.start - 1) {
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
      } else if (value === curr.interval.end + 1) {
        // value borders right

        if (curr.right && value === curr.right.interval.start - 1) {
          // absorb right child
          valueNode = curr.absorbRight(curr.right);
        } else {
          // just extend 1 to the right
          curr.interval.end = value;
          valueNode = curr;
        }
      } else if (value > curr.interval.end + 1){

        // value is somewhere to the right
        if (curr.right) {
          curr = curr.right;
        } else {
          valueNode = curr.right = new DiscreteIntervalNode(value, value, curr);
        }
      }
    }

    return valueNode;
  }

  removeNode(node) {
    if (node.isLeaf()) {
      if (node === this.root) {
        this.root = null;
      } else {
        if (node === node.parent.left) {
          node.parent.left = null;
        } else if (node === node.parent.right) {
          node.parent.right = null;
        }
      }

      return null;
    } else if (node.hasOneChild()) {
      const child = node.left || node.right;
      node.interval = child.interval;
      node.left = child.left;
      node.right = child.right;

      if (child.left) {
        child.left.parent = node;
      }
      if (child.right) {
        child.right.parent = node;
      }

      return node;
    } else {
      const replacement = node.getLeftMostLeaf(node.right);
      node.interval = replacement.interval;
      this.removeNode(replacement);
      return node;
    }
  }

  remove(start, end) {
    end = typeof end === 'number' ? end : start;

    let curr = this.root;

    while (curr) {
      if (start > curr.interval.start && end < curr.interval.end) {
        // split node
        const prevEnd = curr.interval.end;
        curr.interval.end = start - 1;
        this.add(end + 1, prevEnd);
        return true;
      } else if (end < curr.interval.start) {
        // look left
        curr = curr.left;
      } else if (start > curr.interval.end) {
        // look right
        curr = curr.right;
      } else if (start <= curr.interval.start && end >= curr.interval.end) {
        // remove entire node
        curr = this.removeNode(curr);
        //curr = curr.right;
     } else if (start <= curr.interval.start && end < curr.interval.end) {
        // prune left
        curr.interval.start = end + 1;
        curr = curr.right;
      } else if (start > curr.interval.start && end >= curr.interval.end) {
         // prune right
        curr.interval.end = start - 1;
        curr = curr.left;
      }
    }

    return false;
  }
};

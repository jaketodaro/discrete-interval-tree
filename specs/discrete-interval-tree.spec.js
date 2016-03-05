var intervals;

describe('discrete-intervals', function() {
  beforeEach(function() {
    intervals = new DiscreteIntervalTree();

    jasmine.addMatchers({
      toMatchNode: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            function areNodesEqual(actualNode, testNode) {
              if (!actualNode && !testNode) {
                return true;
              } else if (typeof actualNode !== typeof testNode) {
                return false;
              } else {
                return actualNode.interval.start === testNode[0] &&
                  actualNode.interval.end === testNode[1] &&
                  areNodesEqual(actualNode.left, testNode[2]) &&
                  areNodesEqual(actualNode.right, testNode[3]);
              }
            }

            return {
              pass: areNodesEqual(actual, expected),
              message: 'Nodes are not equal'
            };
          }
        };
      }
    });
  });

  describe('contains', function() {
    it('should return false if there is no root', function() {
      expect(intervals.contains(1)).toBe(false);
    });

    it('should return false if the value is not in the tree', function() {
      intervals.add(0);
      intervals.add(5);
      expect(intervals.contains(-1)).toBe(false);
      expect(intervals.contains(1)).toBe(false);
      expect(intervals.contains(4)).toBe(false);
      expect(intervals.contains(6)).toBe(false);
    });

    it('should return false if the interval is not in the tree', function() {
      intervals.add(0, 2);
      intervals.add(5, 7);
      expect(intervals.contains(-2, -1)).toBe(false);
      expect(intervals.contains(-1, 0)).toBe(false);
      expect(intervals.contains(2, 3)).toBe(false);
      expect(intervals.contains(3, 4)).toBe(false);
      expect(intervals.contains(4, 5)).toBe(false);
      expect(intervals.contains(7, 8)).toBe(false);
      expect(intervals.contains(8, 9)).toBe(false);
      expect(intervals.contains(0, 7)).toBe(false);
    });

    it('should return true if the value is in the tree', function() {
      intervals.add(0, 2);
      intervals.add(5, 7);
      expect(intervals.contains(0)).toBe(true);
      expect(intervals.contains(1)).toBe(true);
      expect(intervals.contains(2)).toBe(true);
      expect(intervals.contains(5)).toBe(true);
      expect(intervals.contains(6)).toBe(true);
      expect(intervals.contains(7)).toBe(true);
    });

    it('should return true if the interval is in the tree', function() {
      intervals.add(0, 2);
      intervals.add(5, 7);
      expect(intervals.contains(0, 1)).toBe(true);
      expect(intervals.contains(0, 2)).toBe(true);
      expect(intervals.contains(1, 2)).toBe(true);
      expect(intervals.contains(5, 6)).toBe(true);
      expect(intervals.contains(5, 7)).toBe(true);
      expect(intervals.contains(6, 7)).toBe(true);
    });
  });

  describe('add value', function() {
    it('should add a value into an empty tree', function() {
      intervals.add(1);

      expect(intervals.root).toMatchNode([1, 1]);
    });

    it('should add a value to the left of the root', function() {
      intervals.add(1);
      intervals.add(-1);

      expect(intervals.root).toMatchNode([1, 1, [-1, -1]]);
    });

    it('should add a value to the right of the root', function() {
      intervals.add(1);
      intervals.add(3);

      expect(intervals.root).toMatchNode([1, 1, null, [3, 3]]);
    });

    it('should add a value adjacent to the left of the root', function() {
      intervals.add(1);
      intervals.add(0);

      expect(intervals.root).toMatchNode([0, 1]);
    });

    it('should add a value adjacent to the right of the root', function() {
      intervals.add(1);
      intervals.add(2);

      expect(intervals.root).toMatchNode([1, 2]);
    });

    it('should add a value that joins a parent with a left child', function() {
      intervals.add(1);
      intervals.add(-1);
      intervals.add(0);

      expect(intervals.root).toMatchNode([-1, 1]);
    });

    it('should add a value that joins a parent with a right child', function() {
      intervals.add(1);
      intervals.add(3);
      intervals.add(2);

      expect(intervals.root).toMatchNode([1, 3])
    });
  });

  describe('add interval', function() {
    it('should add an interval into an empty tree', function() {
      intervals.add(1, 2);

      expect(intervals.root).toMatchNode([1, 2]);
    });

    it('should add an interval to the left of the root', function() {
      intervals.add(1, 2);
      intervals.add(-2, -1);

      expect(intervals.root).toMatchNode([1, 2, [-2, -1]]);
    });

    it('should add an interval to the right of the root', function() {
      intervals.add(1, 2);
      intervals.add(4, 5);

      expect(intervals.root).toMatchNode([1, 2, null, [4, 5]]);
    });

    it('should add an interval adjacent to the left of the root', function() {
      intervals.add(1, 2);
      intervals.add(-1, 0);

      expect(intervals.root).toMatchNode([-1, 2]);
    });

    it('should add an interval adjacent to the right of the root', function() {
      intervals.add(1, 2);
      intervals.add(3, 4);

      expect(intervals.root).toMatchNode([1, 4]);
    });

    it('should add an interval that joins a parent with a left child', function() {
      intervals.add(1, 2);
      intervals.add(-3, -2);
      intervals.add(-1, 0);

      expect(intervals.root).toMatchNode([-3, 2]);
    });

    it('should add an interval that joins a parent with a right child', function() {
      intervals.add(1, 2);
      intervals.add(5, 6);
      intervals.add(3, 4);

      expect(intervals.root).toMatchNode([1, 6]);
    });
  });

  describe('remove', function() {
    it('should return false if there is no root', function() {
      expect(intervals.remove(0, 0)).toBe(false);
    });

    it('should return false if removing values that arent in the tree', function() {
      intervals.add(0);
      expect(intervals.remove(1)).toBe(false);
      expect(intervals.remove(-1)).toBe(false);

      intervals.add(5);
      expect(intervals.remove(4)).toBe(false);
      expect(intervals.remove(6)).toBe(false);
    });

    it('should be able to remove the root interval', function() {
      intervals.add(0);
      intervals.remove(0);

      expect(intervals.root).toBe(null);
      expect(intervals.contains(0)).toBe(false);

      intervals.add(0);
      intervals.add(4);
      intervals.remove(0);

      expect(intervals.contains(0)).toBe(false);
      expect(intervals.contains(4)).toBe(true);

      intervals.add(0);
      intervals.add(-2);
      intervals.add(4);
      intervals.remove(0);

      expect(intervals.contains(0)).toBe(false);
      expect(intervals.contains(-2)).toBe(true);
      expect(intervals.contains(4)).toBe(true);
    });

    it('should prune nodes when removing an overlapping interval', function() {
      intervals.add(2, 5);
      intervals.add(-10, -5);
      intervals.add(10, 15);

      intervals.remove(2, 2);
      expect(intervals.contains(2)).toBe(false);
      expect(intervals.contains(3)).toBe(true);

      intervals.remove(4, 6);
      expect(intervals.contains(3)).toBe(true);
      expect(intervals.contains(4)).toBe(false);
      expect(intervals.contains(6)).toBe(false);

      intervals.remove(-20, -8);
      expect(intervals.contains(-8)).toBe(false);
      expect(intervals.contains(-7)).toBe(true);

      intervals.remove(8, 14);
      expect(intervals.contains(10)).toBe(false);
      expect(intervals.contains(14)).toBe(false);
      expect(intervals.contains(15)).toBe(true);
    });

    it('should split an interval if removing an enclosed interval', function() {
      intervals.add(0, 10);
      intervals.add(20, 30);

      intervals.remove(2);
      expect(intervals.contains(1)).toBe(true);
      expect(intervals.contains(2)).toBe(false);
      expect(intervals.contains(3)).toBe(true);

      intervals.remove(5, 7);
      expect(intervals.contains(4)).toBe(true);
      expect(intervals.contains(5)).toBe(false);
      expect(intervals.contains(7)).toBe(false);
      expect(intervals.contains(8)).toBe(true);

      intervals.remove(22, 25);
      expect(intervals.contains(21)).toBe(true);
      expect(intervals.contains(22)).toBe(false);
      expect(intervals.contains(25)).toBe(false);
      expect(intervals.contains(26)).toBe(true);
    });

    it('should remove leaf intervals if removing a larger interval', function() {
      intervals.add(5, 10);
      intervals.add(0, 1);
      intervals.add(15, 20);

      intervals.remove(0, 1);
      expect(intervals.contains(0, 1)).toBe(false);

      intervals.remove(14, 21);
      expect(intervals.contains(15, 20)).toBe(false);
    });

    it('should remove intervals with one child if removing a larger interval', function() {
      intervals.add(5, 10);

      intervals.add(0, 1);
      intervals.add(-5, -3);
      intervals.remove(0, 1);
      expect(intervals.contains(-5, -3)).toBe(true);
      expect(intervals.contains(0, 1)).toBe(false);

      intervals.add(15, 20);
      intervals.add(25, 30);
      intervals.remove(16, 21);
      expect(intervals.contains(25, 30)).toBe(true);
      expect(intervals.contains(15, 20)).toBe(false);
    });

    it('should remove intervals with two children if removing a larger interval', function() {
      intervals.add(0, 5);
      intervals.add(15, 20);
      intervals.add(10, 12);
      intervals.add(25, 30);

      intervals.remove(15, 20);
      expect(intervals.contains(10, 12)).toBe(true);
      expect(intervals.contains(25, 30)).toBe(true);
      expect(intervals.contains(15, 20)).toBe(false);
    });

    it('can remove multiple intervals if removing a large interval', function() {
      intervals.add(0);
      intervals.add(5);
      intervals.add(2);
      intervals.add(9);
      intervals.add(7);
      intervals.add(11);

      intervals.remove(1, 11);
      expect(intervals.contains(0)).toBe(true);
      expect(intervals.root.isLeaf()).toBe(true);
    });
  });
});

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

  describe('add', function() {
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

  describe('add', function() {
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
});

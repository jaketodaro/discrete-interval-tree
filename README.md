# discrete-interval-tree

A discrete interval tree is a binary search tree that stores non overlapping (discrete) ranges (intervals), of items.
Unlike a normal interval tree, a discrete interval tree does not allow overlap, and will extend and merge existing
intervals as needed to keep the smallest possible data structure.

Conceptually, this tree should be though of as storing individual items, not intervals. When you add(5, 10), think of it
as adding all the values from 5 to 10, not adding an interval that begins a 5 and ends at 10. It is important to think
this way because the tree will not always store the intervals in the form that they were added. For example, if you
add(1,2) and then add(2, 3), the tree will contain only one interval, (1, 3).

```
    (5, 10)
     /   \
 (0, 1)  (15, 20)
           \
           (25, 30)
```

## API

### Constructor

`var intervals = new DiscreteIntervalTree();`

### Methods

`getIntervals()` - return a sorted array of all the intervals

`contains(start, [end])` - returns true if the value or interval is contained in the tree

`add(start, [end])` - add a value or interval to the tree

`remove(start, [end])` - remove a value or interval to the tree
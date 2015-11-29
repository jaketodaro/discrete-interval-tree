class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = typeof end === 'number' ? end : start;
  }

  contains(value) {
    return value >= this.start && value <= this.end;
  }

  bordersStart(value) {
    return value === this.start - 1;
  }

  bordersEnd(value) {
    return value === this.end + 1;
  }

  isLessThan(value) {
    return value > this.end + 1;
  }

  isGreaterThan(value) {
    return value < this.start - 1;
  }
}

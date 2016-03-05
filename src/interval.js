class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = typeof end === 'number' ? end : start;
  }

  contains(value) {
    return value >= this.start && value <= this.end;
  }
}

// @strict: true
// @noEmit: true
// @target: esnext
// @lib: esnext

class S<T> {
  set: Set<T>;

  constructor(set: Set<T>) {
    this.set = set;
  }

  array() {
    return new S(new Set([...this.set].map((item) => [item])));
  }
}

function sArray<T>(set: Set<T>) {
  return new S(new Set([...set].map((item) => [item])));
}

class C<T> {
  constructor(readonly x: T) {}

  good<U extends T>(y: U) {
      if (y === this.x) {}
  }

  bad<U extends T | string>(y: U) {
      if (y === this.x) {}
  }
}

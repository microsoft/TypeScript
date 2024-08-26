// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/44814

class TestClass<T> {
  typeguard(val: unknown): val is T {
    return true;
  }
  f(v: number): void {}
  h(v: T): void {}
  func(val: T | number): void {
    if (this.typeguard(val)) {
      this.h(val);
      return;
    }
    this.f(val);
  }
}

class TestClass2<T extends Date> {
  typeguard(val: unknown): val is T {
    return true;
  }
  f(v: number): void {}
  h(v: T): void {}
  func(val: T | number): void {
    if (this.typeguard(val)) {
      this.h(val);
      return;
    }
    val;
    this.f(val);
  }
}

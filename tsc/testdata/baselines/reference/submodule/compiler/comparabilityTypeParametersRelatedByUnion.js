//// [tests/cases/compiler/comparabilityTypeParametersRelatedByUnion.ts] ////

//// [comparabilityTypeParametersRelatedByUnion.ts]
class C<T> {
  constructor(readonly x: T) {}

  good<U extends T>(y: U) {
      if (y === this.x) {}
  }

  bad<U extends T | string>(y: U) {
      if (y === this.x) {}
  }
}


//// [comparabilityTypeParametersRelatedByUnion.js]
class C {
    x;
    constructor(x) {
        this.x = x;
    }
    good(y) {
        if (y === this.x) { }
    }
    bad(y) {
        if (y === this.x) { }
    }
}

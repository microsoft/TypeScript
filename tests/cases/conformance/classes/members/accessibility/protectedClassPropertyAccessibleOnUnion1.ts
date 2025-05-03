// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59289

class Foo {
  protected pro: number;

  constructor(foo?: Foo | Bar) {
    this.pro = foo ? foo.pro + 1 : Math.random();
  }
}

class Bar extends Foo {}

class Baz {
  protected pro: number;

  constructor(arg?: Baz | Qwe) {
    this.pro = arg ? arg.pro + 1 : Math.random(); // error
  }
}

class Qwe {
  protected pro: number = 42;
}

// https://github.com/microsoft/TypeScript/issues/46049

export class A {
  protected bar(): void {}
  baz() {
    const unionRef: this | A = this;
    unionRef.bar();
  }
}

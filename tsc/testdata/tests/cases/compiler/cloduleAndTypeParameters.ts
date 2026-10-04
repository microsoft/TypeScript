// @target: es2015
class Foo<T extends Foo.Bar> {
  constructor() {
  }
}

namespace Foo {
  export interface Bar {
    bar(): void;
  }

  export class Baz {
  }
}
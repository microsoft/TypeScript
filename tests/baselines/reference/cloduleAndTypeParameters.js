//// [tests/cases/compiler/cloduleAndTypeParameters.ts] ////

//// [cloduleAndTypeParameters.ts]
class Foo<T extends Foo.Bar> {
  constructor() {
  }
}

module Foo {
  export interface Bar {
    bar(): void;
  }

  export class Baz {
  }
}

//// [cloduleAndTypeParameters.js]
class Foo {
    constructor() {
    }
}
(function (Foo) {
    class Baz {
    }
    Foo.Baz = Baz;
})(Foo || (Foo = {}));

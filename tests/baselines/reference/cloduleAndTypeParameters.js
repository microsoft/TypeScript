//// [tests/cases/compiler/cloduleAndTypeParameters.ts] ////

//// [cloduleAndTypeParameters.ts]
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

//// [cloduleAndTypeParameters.js]
"use strict";
class Foo {
    constructor() {
    }
}
(function (Foo) {
    class Baz {
    }
    Foo.Baz = Baz;
})(Foo || (Foo = {}));

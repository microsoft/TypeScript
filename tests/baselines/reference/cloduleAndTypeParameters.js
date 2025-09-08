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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
(function (Foo) {
    var Baz = /** @class */ (function () {
        function Baz() {
        }
        return Baz;
    }());
    Foo.Baz = Baz;
})(Foo || (Foo = {}));

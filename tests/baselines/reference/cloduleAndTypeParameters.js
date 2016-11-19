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
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
(function (Foo) {
    var Baz = (function () {
        function Baz() {
        }
        return Baz;
    }());
    Foo.Baz = Baz;
})(Foo || (Foo = {}));

//// [parser553699.ts]
class Foo {
  constructor() { }
  public banana (x: public) { }
}

class Bar {
  constructor(c: Bar) { }
}

//// [parser553699.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.banana = function (x) { };
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar(c) {
    }
    return Bar;
}());

//// [parser553699.ts]
class Foo {
  constructor() { }
  public banana (x: public) { }
}

class Bar {
  constructor(c: Bar) { }
}

//// [parser553699.js]
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.banana = function (x) { };
    return Foo;
}());
var Bar = (function () {
    function Bar(c) {
    }
    return Bar;
}());

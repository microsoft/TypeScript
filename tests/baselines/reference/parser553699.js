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
    var proto_1 = Foo.prototype;
    proto_1.banana = function (x) { };
    return Foo;
}());
var Bar = (function () {
    function Bar(c) {
    }
    return Bar;
}());

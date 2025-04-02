//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser509668.ts] ////

//// [parser509668.ts]
class Foo3 {
  // Doesn't work, but should
  constructor (public ...args: string[]) { }
}

//// [parser509668.js]
var Foo3 = /** @class */ (function () {
    // Doesn't work, but should
    function Foo3() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.args = args;
    }
    return Foo3;
}());

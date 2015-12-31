//// [parser509668.ts]
class Foo3 {
  // Doesn't work, but should
  constructor (public ...args: string[]) { }
}

//// [parser509668.js]
var Foo3 = (function () {
    // Doesn't work, but should
    function Foo3(public) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    }
    return Foo3;
}());

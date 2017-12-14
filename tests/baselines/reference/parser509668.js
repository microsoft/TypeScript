//// [parser509668.ts]
class Foo3 {
  // Doesn't work, but should
  constructor (public ...args: string[]) { }
}

//// [parser509668.js]
var Foo3 = /** @class */ (function () {
    // Doesn't work, but should
    function Foo3() {
        this.args = args;
    }
    return Foo3;
}());

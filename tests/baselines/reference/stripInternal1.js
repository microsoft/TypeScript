//// [stripInternal1.ts]
class C {
  foo(): void { }
  // @internal
  bar(): void { }
}

//// [stripInternal1.js]
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    C_prototype.foo = function () { };
    // @internal
    C_prototype.bar = function () { };
    return C;
}());


//// [stripInternal1.d.ts]
declare class C {
    foo(): void;
}

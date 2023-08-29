//// [tests/cases/compiler/stripInternal1.ts] ////

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
    C.prototype.foo = function () { };
    // @internal
    C.prototype.bar = function () { };
    return C;
}());


//// [stripInternal1.d.ts]
declare class C {
    foo(): void;
}

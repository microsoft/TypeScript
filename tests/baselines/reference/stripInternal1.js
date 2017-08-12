//// [stripInternal1.ts]
class C {
  foo(): void { }
  // @internal
  bar(): void { }
}

//// [stripInternal1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function () { };
    // @internal
    proto_1.bar = function () { };
    return C;
}());


//// [stripInternal1.d.ts]
declare class C {
    foo(): void;
}

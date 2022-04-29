//// [tests/cases/compiler/out-flag3.ts] ////

//// [a.ts]
// --out and --outFile error

class A { }

//// [b.ts]
class B { }


//// [c.js]
// --out and --outFile error
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
//# sourceMappingURL=c.js.map

//// [c.d.ts]
declare class A {
}
declare class B {
}

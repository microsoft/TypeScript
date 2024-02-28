//// [tests/cases/compiler/out-flag3.ts] ////

//// [a.ts]
class A { }

//// [b.ts]
class B { }


//// [d.js]
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
//# sourceMappingURL=d.js.map

//// [d.d.ts]
declare class A {
}
declare class B {
}

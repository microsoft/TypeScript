//// [tests/cases/compiler/out-flag2.ts] ////

//// [a.ts]
class A { }

//// [b.ts]
class B { }

//// [c.js]
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function () {
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

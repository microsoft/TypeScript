//// [nonMergedDeclarationsAndOverloads.ts]
class A {
    m1: string;
    f() {}
    m1 (a: string): void;
    m1 (a: number): void;
    m1 (a: any): void {
    }
}

//// [nonMergedDeclarationsAndOverloads.js]
var A = /** @class */ (function () {
    function A() {
    }
    var A_prototype = A.prototype;
    A_prototype.f = function () { };
    A_prototype.m1 = function (a) {
    };
    return A;
}());

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
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.f = function () { };
    proto_1.m1 = function (a) {
    };
    return A;
}());

//// [mixedStaticAndInstanceClassMembers.ts]
class A {
    f() {}
    static m1 (a: string): void;
    m1 (a: number): void;
    m1 (a: any): void {
    }
}

class B {
    f() {}
    m1 (a: string): void;
    static m1 (a: number): void;
    m1 (a: any): void {
    }
}

//// [mixedStaticAndInstanceClassMembers.js]
var A = /** @class */ (function () {
    function A() {
    }
    var A_prototype = A.prototype;
    A_prototype.f = function () { };
    A_prototype.m1 = function (a) {
    };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    var B_prototype = B.prototype;
    B_prototype.f = function () { };
    B_prototype.m1 = function (a) {
    };
    return B;
}());

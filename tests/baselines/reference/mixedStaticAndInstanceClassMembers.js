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
var A = (function () {
    function A() {
    }
    A.prototype.f = function () { };
    A.prototype.m1 = function (a) {
    };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.f = function () { };
    B.prototype.m1 = function (a) {
    };
    return B;
})();

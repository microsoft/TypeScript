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
    var proto_1 = A.prototype;
    proto_1.f = function () { };
    proto_1.m1 = function (a) {
    };
    return A;
}());
var B = (function () {
    function B() {
    }
    var proto_2 = B.prototype;
    proto_2.f = function () { };
    proto_2.m1 = function (a) {
    };
    return B;
}());

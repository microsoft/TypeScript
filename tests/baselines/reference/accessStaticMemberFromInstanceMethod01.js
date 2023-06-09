//// [tests/cases/compiler/accessStaticMemberFromInstanceMethod01.ts] ////

//// [accessStaticMemberFromInstanceMethod01.ts]
class C {
    foo: string;

    static bar() {
        let k = foo;
    }
}

//// [accessStaticMemberFromInstanceMethod01.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.bar = function () {
        var k = foo;
    };
    return C;
}());

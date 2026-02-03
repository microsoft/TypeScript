//// [tests/cases/compiler/accessInstanceMemberFromStaticMethod01.ts] ////

//// [accessInstanceMemberFromStaticMethod01.ts]
class C {
    static foo: string;

    bar() {
        let k = foo;
    }
}

//// [accessInstanceMemberFromStaticMethod01.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var k = foo;
    };
    return C;
}());

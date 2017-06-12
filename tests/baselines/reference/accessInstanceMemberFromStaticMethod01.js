//// [accessInstanceMemberFromStaticMethod01.ts]
class C {
    static foo: string;

    bar() {
        let k = foo;
    }
}

//// [accessInstanceMemberFromStaticMethod01.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.bar = function () {
        var k = foo;
    };
    return C;
}());

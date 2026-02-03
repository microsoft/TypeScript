//// [tests/cases/compiler/mergedClassNamespaceRecordCast.ts] ////

//// [mergedClassNamespaceRecordCast.ts]
class C1 { foo() {} }

new C1() as Record<string, unknown>;


class C2 { foo() {} }
namespace C2 { export const unrelated = 3; }

new C2() as Record<string, unknown>;

C2.unrelated
new C2().unrelated


namespace C3 { export const unrelated = 3; }

C3 as Record<string, unknown>;


//// [mergedClassNamespaceRecordCast.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype.foo = function () { };
    return C1;
}());
new C1();
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo = function () { };
    return C2;
}());
(function (C2) {
    C2.unrelated = 3;
})(C2 || (C2 = {}));
new C2();
C2.unrelated;
new C2().unrelated;
var C3;
(function (C3) {
    C3.unrelated = 3;
})(C3 || (C3 = {}));
C3;

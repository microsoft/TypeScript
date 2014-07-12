//// [collisionCodeGenModuleWithMemberClassConflict.ts]
module m1 {
    export class m1 {
    }
}
var foo = new m1.m1();

module m2 {
    export class m2 {
    }

    export class _m2 {
    }
}
var foo = new m2.m2();
var foo = new m2._m2();

//// [collisionCodeGenModuleWithMemberClassConflict.js]
var m1;
(function (_m1) {
    var m1 = (function () {
        function m1() {
        }
        return m1;
    })();
    _m1.m1 = m1;
})(m1 || (m1 = {}));
var foo = new m1.m1();

var m2;
(function (__m2) {
    var m2 = (function () {
        function m2() {
        }
        return m2;
    })();
    __m2.m2 = m2;

    var _m2 = (function () {
        function _m2() {
        }
        return _m2;
    })();
    __m2._m2 = _m2;
})(m2 || (m2 = {}));
var foo = new m2.m2();
var foo = new m2._m2();

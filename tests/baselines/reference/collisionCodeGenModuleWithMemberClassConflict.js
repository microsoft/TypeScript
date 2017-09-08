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
(function (m1_1) {
    var m1 = /** @class */ (function () {
        function m1() {
        }
        return m1;
    }());
    m1_1.m1 = m1;
})(m1 || (m1 = {}));
var foo = new m1.m1();
var m2;
(function (m2_1) {
    var m2 = /** @class */ (function () {
        function m2() {
        }
        return m2;
    }());
    m2_1.m2 = m2;
    var _m2 = /** @class */ (function () {
        function _m2() {
        }
        return _m2;
    }());
    m2_1._m2 = _m2;
})(m2 || (m2 = {}));
var foo = new m2.m2();
var foo = new m2._m2();

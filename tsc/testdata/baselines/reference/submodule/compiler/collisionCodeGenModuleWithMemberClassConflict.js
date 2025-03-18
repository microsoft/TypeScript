//// [tests/cases/compiler/collisionCodeGenModuleWithMemberClassConflict.ts] ////

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
    class m1 {
    }
    m1_1.m1 = m1;
})(m1 || (m1 = {}));
var foo = new m1.m1();
var m2;
(function (m2_1) {
    class m2 {
    }
    m2_1.m2 = m2;
    class _m2 {
    }
    m2_1._m2 = _m2;
})(m2 || (m2 = {}));
var foo = new m2.m2();
var foo = new m2._m2();

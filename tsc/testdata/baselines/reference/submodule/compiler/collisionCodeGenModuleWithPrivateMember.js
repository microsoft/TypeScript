//// [tests/cases/compiler/collisionCodeGenModuleWithPrivateMember.ts] ////

//// [collisionCodeGenModuleWithPrivateMember.ts]
module m1 {
    class m1 {
    }
    var x = new m1();
    export class c1 {
    }
}
var foo = new m1.c1();

//// [collisionCodeGenModuleWithPrivateMember.js]
var m1;
(function (m1_1) {
    class m1 {
    }
    var x = new m1();
    class c1 {
    }
    m1_1.c1 = c1;
})(m1 || (m1 = {}));
var foo = new m1.c1();

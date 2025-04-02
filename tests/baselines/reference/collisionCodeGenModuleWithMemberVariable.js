//// [tests/cases/compiler/collisionCodeGenModuleWithMemberVariable.ts] ////

//// [collisionCodeGenModuleWithMemberVariable.ts]
module m1 {
    export var m1 = 10;
    var b = m1;
}
var foo = m1.m1;

//// [collisionCodeGenModuleWithMemberVariable.js]
var m1;
(function (m1_1) {
    m1_1.m1 = 10;
    var b = m1_1.m1;
})(m1 || (m1 = {}));
var foo = m1.m1;

//// [collisionCodeGenModuleWithMemberVariable.ts]
module m1 {
    export var m1 = 10;
    var b = m1;
}
var foo = m1.m1;

//// [collisionCodeGenModuleWithMemberVariable.js]
var m1;
(function (_m1) {
    _m1.m1 = 10;
    var b = _m1.m1;
})(m1 || (m1 = {}));
var foo = m1.m1;

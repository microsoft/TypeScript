//// [tests/cases/compiler/collisionCodeGenModuleWithMemberInterfaceConflict.ts] ////

//// [collisionCodeGenModuleWithMemberInterfaceConflict.ts]
namespace m1 {
    export interface m1 {
    }
    export class m2 implements m1 {
    }
}
var foo = new m1.m2();

//// [collisionCodeGenModuleWithMemberInterfaceConflict.js]
"use strict";
var m1;
(function (m1) {
    class m2 {
    }
    m1.m2 = m2;
})(m1 || (m1 = {}));
var foo = new m1.m2();

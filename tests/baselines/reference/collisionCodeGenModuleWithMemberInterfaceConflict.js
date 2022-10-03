//// [collisionCodeGenModuleWithMemberInterfaceConflict.ts]
module m1 {
    export interface m1 {
    }
    export class m2 implements m1 {
    }
}
var foo = new m1.m2();

//// [collisionCodeGenModuleWithMemberInterfaceConflict.js]
var m1;
(function (m1) {
    var m2 = /** @class */ (function () {
        function m2() {
        }
        return m2;
    }());
    m1.m2 = m2;
})(m1 || (m1 = {}));
var foo = new m1.m2();

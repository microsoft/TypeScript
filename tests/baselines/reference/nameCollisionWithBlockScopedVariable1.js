//// [tests/cases/compiler/nameCollisionWithBlockScopedVariable1.ts] ////

//// [nameCollisionWithBlockScopedVariable1.ts]
namespace M {
    export class C { }
}
namespace M {
    {
        let M = 0;
        new C();
    }
}

//// [nameCollisionWithBlockScopedVariable1.js]
var M;
(function (M) {
    class C {
    }
    M.C = C;
})(M || (M = {}));
(function (M_1) {
    {
        let M = 0;
        new M_1.C();
    }
})(M || (M = {}));

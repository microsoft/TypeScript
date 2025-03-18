//// [tests/cases/compiler/moduleReopenedTypeOtherBlock.ts] ////

//// [moduleReopenedTypeOtherBlock.ts]
module M {
    export class C1 { }
    export interface I { n: number; }
}
module M {
    export class C2 { f(): I { return null; } }
}


//// [moduleReopenedTypeOtherBlock.js]
var M;
(function (M) {
    class C1 {
    }
    M.C1 = C1;
})(M || (M = {}));
(function (M) {
    class C2 {
        f() { return null; }
    }
    M.C2 = C2;
})(M || (M = {}));

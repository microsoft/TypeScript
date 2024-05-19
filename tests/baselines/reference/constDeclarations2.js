//// [tests/cases/compiler/constDeclarations2.ts] ////

//// [constDeclarations2.ts]
// No error
module M {
    export const c1 = false;
    export const c2: number = 23;
    export const c3 = 0, c4 :string = "", c5 = null;
}


//// [constDeclarations2.js]
// No error
var M;
(function (M) {
    M.c1 = false;
    M.c2 = 23;
    M.c3 = 0, M.c4 = "", M.c5 = null;
})(M || (M = {}));


//// [constDeclarations2.d.ts]
declare namespace M {
    const c1 = false;
    const c2: number;
    const c3 = 0, c4: string, c5: any;
}

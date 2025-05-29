//// [tests/cases/compiler/letDeclarations2.ts] ////

//// [letDeclarations2.ts]
module M {
    let l1 = "s";
    export let l2 = 0;
}

//// [letDeclarations2.js]
var M;
(function (M) {
    let l1 = "s";
    M.l2 = 0;
})(M || (M = {}));


//// [letDeclarations2.d.ts]
declare namespace M {
    let l2: number;
}

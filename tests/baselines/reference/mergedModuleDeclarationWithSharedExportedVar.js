//// [mergedModuleDeclarationWithSharedExportedVar.ts]
module M {
    export var v = 10;
    v;
}
module M {
    v;
}

//// [mergedModuleDeclarationWithSharedExportedVar.js]
var M = M || (M = {});
(function (M) {
    M.v = 10;
    M.v;
})(M);
(function (M) {
    M.v;
})(M);

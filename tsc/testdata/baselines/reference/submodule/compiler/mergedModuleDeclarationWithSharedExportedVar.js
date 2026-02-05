//// [tests/cases/compiler/mergedModuleDeclarationWithSharedExportedVar.ts] ////

//// [mergedModuleDeclarationWithSharedExportedVar.ts]
namespace M {
    export var v = 10;
    v;
}
namespace M {
    v;
}

//// [mergedModuleDeclarationWithSharedExportedVar.js]
"use strict";
var M;
(function (M) {
    M.v = 10;
    M.v;
})(M || (M = {}));
(function (M) {
    v;
})(M || (M = {}));

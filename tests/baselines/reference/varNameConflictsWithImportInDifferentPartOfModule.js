//// [tests/cases/compiler/varNameConflictsWithImportInDifferentPartOfModule.ts] ////

//// [varNameConflictsWithImportInDifferentPartOfModule.ts]
module M1 {
    export var q = 5;
    export var s = '';
}
module M1 {
    export import q = M1.s; // Should be an error but isn't
}

//// [varNameConflictsWithImportInDifferentPartOfModule.js]
var M1;
(function (M1) {
    M1.q = 5;
    M1.s = '';
})(M1 || (M1 = {}));
(function (M1) {
    M1.q = M1.s; // Should be an error but isn't
})(M1 || (M1 = {}));

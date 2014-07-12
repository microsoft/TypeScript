//// [varNameConflictsWithImportInDifferentPartOfModule.js]
var M1;
(function (M1) {
    M1.q = 5;
    M1.s = '';
})(M1 || (M1 = {}));
var M1;
(function (M1) {
    M1.q = M1.s;
})(M1 || (M1 = {}));

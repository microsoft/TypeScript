//// [parserExportAssignment5.ts]
module M {
    export = A;
}

//// [parserExportAssignment5.js]
var M = M || (M = {});
(function (M) {
    export = A;
})(M);

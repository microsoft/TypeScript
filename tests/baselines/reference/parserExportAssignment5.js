//// [parserExportAssignment5.ts]
module M {
    export = A;
}

//// [parserExportAssignment5.js]
var M;
(function (M) {
    export = A;
})(M || (M = {}));

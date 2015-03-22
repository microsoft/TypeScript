//// [parserExportAssignment8.ts]
export = B;

export class C {
}

//// [parserExportAssignment8.js]
var C = (function () {
    function C() {
    }
    return C;
})();
exports.C = C;

//// [parserExportAssignment7.ts]
export class C {
}

export = B;

//// [parserExportAssignment7.js]
var C = (function () {
    function C() {
    }
    return C;
})();
exports.C = C;

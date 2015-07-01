//// [ExportAssignment8.ts]
export = B;

export class C {
}

//// [ExportAssignment8.js]
var C = (function () {
    function C() {
    }
    return C;
})();
exports.C = C;

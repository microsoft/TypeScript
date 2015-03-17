//// [declarationEmitDefaultExport1.ts]
export default class C {
}

//// [declarationEmitDefaultExport1.js]
var C = (function () {
    function C() {
    }
    return C;
})();
module.exports = C;


//// [declarationEmitDefaultExport1.d.ts]
export default class C {
}

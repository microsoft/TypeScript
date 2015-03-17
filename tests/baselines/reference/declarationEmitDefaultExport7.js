//// [declarationEmitDefaultExport7.ts]
class A {}
export default new A();


//// [declarationEmitDefaultExport7.js]
var A = (function () {
    function A() {
    }
    return A;
})();
module.exports = new A();

//// [declarationEmitDefaultExport6.ts]
export class A {}
export default new A();


//// [declarationEmitDefaultExport6.js]
var A = (function () {
    function A() {
    }
    return A;
})();
exports.A = A;
module.exports = new A();


//// [declarationEmitDefaultExport6.d.ts]
export declare class A {
}
export default : A;

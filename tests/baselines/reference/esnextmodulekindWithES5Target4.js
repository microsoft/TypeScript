//// [tests/cases/conformance/externalModules/esnext/esnextmodulekindWithES5Target4.ts] ////

//// [esnextmodulekindWithES5Target4.ts]
class E { }
export default E;

//// [esnextmodulekindWithES5Target4.js]
var E = /** @class */ (function () {
    function E() {
    }
    return E;
}());
export default E;

//// [tests/cases/conformance/externalModules/esnext/exnextmodulekindExportClassNameWithObject.ts] ////

//// [exnextmodulekindExportClassNameWithObject.ts]
export class Object {}


//// [exnextmodulekindExportClassNameWithObject.js]
var Object = /** @class */ (function () {
    function Object() {
    }
    return Object;
}());
export { Object };

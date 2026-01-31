//// [tests/cases/conformance/externalModules/es6/es6modulekindExportClassNameWithObject.ts] ////

//// [es6modulekindExportClassNameWithObject.ts]
export class Object {}


//// [es6modulekindExportClassNameWithObject.js]
var Object = /** @class */ (function () {
    function Object() {
    }
    return Object;
}());
export { Object };

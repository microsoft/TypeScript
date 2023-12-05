//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportDoubleAssignmentInClosure.ts] ////

//// [index.js]
// @ts-nocheck
function foo() {
    module.exports = exports = function (o) {
        return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
    };
    const m = function () {
        // I have no idea what to put here
    }
    exports.methods = m;
}


//// [index.js]
// @ts-nocheck
function foo() {
    module.exports = exports = function (o) {
        return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
    };
    var m = function () {
        // I have no idea what to put here
    };
    exports.methods = m;
}


//// [index.d.ts]
declare function _exports(o: any): any;
declare namespace _exports {
    export { m as methods };
}
export = _exports;
declare function m(): void;

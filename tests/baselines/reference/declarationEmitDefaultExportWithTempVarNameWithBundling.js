//// [tests/cases/compiler/declarationEmitDefaultExportWithTempVarNameWithBundling.ts] ////

//// [pi.ts]
export default 3.14159;

//// [app.js]
System.register("pi", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", 3.14159);
        }
    };
});


//// [app.d.ts]
declare module "pi" {
    const _default: 3.14159;
    export default _default;
}

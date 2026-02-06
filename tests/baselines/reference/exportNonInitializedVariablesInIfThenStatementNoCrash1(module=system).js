//// [tests/cases/conformance/externalModules/exportNonInitializedVariablesInIfThenStatementNoCrash1.ts] ////

//// [exportNonInitializedVariablesInIfThenStatementNoCrash1.ts]
// https://github.com/microsoft/TypeScript/issues/59373

if (true)
export const cssExports: CssExports;
export default cssExports;


//// [exportNonInitializedVariablesInIfThenStatementNoCrash1.js]
// https://github.com/microsoft/TypeScript/issues/59373
System.register([], function (exports_1, context_1) {
    "use strict";
    var cssExports;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            if (true) { }
            exports_1("default", cssExports);
        }
    };
});

//// [tests/cases/conformance/externalModules/exportNonInitializedVariablesInIfThenStatementNoCrash1.ts] ////

//// [exportNonInitializedVariablesInIfThenStatementNoCrash1.ts]
// https://github.com/microsoft/TypeScript/issues/59373

if (true)
export const cssExports: CssExports;
export default cssExports;


//// [exportNonInitializedVariablesInIfThenStatementNoCrash1.js]
// https://github.com/microsoft/TypeScript/issues/59373
if (true)
    export var cssExports;
export default cssExports;

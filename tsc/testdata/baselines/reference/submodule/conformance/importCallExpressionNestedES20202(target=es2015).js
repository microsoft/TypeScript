//// [tests/cases/conformance/dynamicImport/importCallExpressionNestedES20202.ts] ////

//// [foo.ts]
export default "./foo";

//// [index.ts]
async function foo() {
    return await import((await import("./foo")).default);
}


//// [foo.js]
export default "./foo";
//// [index.js]
"use strict";
async function foo() {
    return await import((await import("./foo")).default);
}

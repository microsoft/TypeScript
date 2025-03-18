//// [tests/cases/conformance/dynamicImport/importCallExpressionNestedCJS.ts] ////

//// [foo.ts]
export default "./foo";

//// [index.ts]
async function foo() {
    return await import((await import("./foo")).default);
}

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "./foo";
//// [index.js]
async function foo() {
    return await Promise.resolve(`${(await Promise.resolve().then(() => require("./foo"))).default}`).then(s => require(s));
}

//// [tests/cases/conformance/dynamicImport/importCallExpressionInUMD5.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
// https://github.com/microsoft/TypeScript/issues/36780
async function func() {
    const packageName = '.';
    const packageJson = await import(packageName + '/package.json');
}


//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { return "foo"; }
//// [1.js]
// https://github.com/microsoft/TypeScript/issues/36780
async function func() {
    const packageName = '.';
    const packageJson = await Promise.resolve(`${packageName + '/package.json'}`).then(s => require(s));
}

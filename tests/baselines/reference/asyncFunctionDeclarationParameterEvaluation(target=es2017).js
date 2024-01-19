//// [tests/cases/conformance/async/asyncFunctionDeclarationParameterEvaluation.ts] ////

//// [asyncFunctionDeclarationParameterEvaluation.ts]
// https://github.com/microsoft/TypeScript/issues/40410
async function f1(x, y = z) {}
async function f2({[z]: x}) {}
async function f3(x = z) { return async () => arguments; }
async function f4(x = z) { return async () => async () => arguments; }
async function f5(x = z, ...args) { }
async function f6(x = z, ...args) { return async () => arguments; }
async function f7(x = z, ...args) { return async () => async () => arguments; }
async function f8() { return async (x = z) => arguments; }
async function f9() { return async (x = z) => async () => arguments; }
async function f10(x = z) { return async () => async function () { return async () => arguments; }; }
function f11() { return async (x = z) => arguments; }
function f12() { return async (x = z) => async () => arguments; }
function f() {
    const a1 = async (x, y = z) => {};
    const a2 = async ({[z]: x}) => {};
    const a3 = async (x = z) => { return async () => arguments; };
    const a4 = async (x = z) => { return async () => async () => arguments; };
    const a5 = async (x = z, ...args) => { };
    const a6 = async (x = z, ...args) => { return async () => arguments; };
    const a7 = async (x = z, ...args) => { return async () => async () => arguments; };
    const a8 = async () => { return async (x = z) => arguments; };
    const a9 = async () => { return async (x = z) => async () => arguments; };
    const a10 = async (x = z) => { return async () => async function () { return async () => arguments; }; };
}

//// [asyncFunctionDeclarationParameterEvaluation.js]
// https://github.com/microsoft/TypeScript/issues/40410
async function f1(x, y = z) { }
async function f2({ [z]: x }) { }
async function f3(x = z) { return async () => arguments; }
async function f4(x = z) { return async () => async () => arguments; }
async function f5(x = z, ...args) { }
async function f6(x = z, ...args) { return async () => arguments; }
async function f7(x = z, ...args) { return async () => async () => arguments; }
async function f8() { return async (x = z) => arguments; }
async function f9() { return async (x = z) => async () => arguments; }
async function f10(x = z) { return async () => async function () { return async () => arguments; }; }
function f11() { return async (x = z) => arguments; }
function f12() { return async (x = z) => async () => arguments; }
function f() {
    const a1 = async (x, y = z) => { };
    const a2 = async ({ [z]: x }) => { };
    const a3 = async (x = z) => { return async () => arguments; };
    const a4 = async (x = z) => { return async () => async () => arguments; };
    const a5 = async (x = z, ...args) => { };
    const a6 = async (x = z, ...args) => { return async () => arguments; };
    const a7 = async (x = z, ...args) => { return async () => async () => arguments; };
    const a8 = async () => { return async (x = z) => arguments; };
    const a9 = async () => { return async (x = z) => async () => arguments; };
    const a10 = async (x = z) => { return async () => async function () { return async () => arguments; }; };
}

//// [tests/cases/compiler/es5-asyncFunctionConditionals.ts] ////

//// [es5-asyncFunctionConditionals.ts]
declare var x, y, z, a, b, c;

async function conditional0() {
    a = (await x) ? y : z;
}

async function conditional1() {
    a = x ? await y : z;
}

async function conditional2() {
    a = x ? y : await z;
}

//// [es5-asyncFunctionConditionals.js]
async function conditional0() {
    a = (await x) ? y : z;
}
async function conditional1() {
    a = x ? await y : z;
}
async function conditional2() {
    a = x ? y : await z;
}

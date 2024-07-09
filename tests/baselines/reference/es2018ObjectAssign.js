//// [tests/cases/compiler/es2018ObjectAssign.ts] ////

//// [es2018ObjectAssign.ts]
const test = Object.assign({}, { test: true });

declare const p: Promise<number>;
p.finally();

//// [es2018ObjectAssign.js]
const test = Object.assign({}, { test: true });
p.finally();

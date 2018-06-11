//// [es2018ObjectAssign.ts]
const test = Object.assign({}, { test: true });

const p: Promise<number>;
p.finally();

//// [es2018ObjectAssign.js]
const test = Object.assign({}, { test: true });
const p;
p.finally();

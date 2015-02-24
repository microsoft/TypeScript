//// [parserES5ForOfStatement13.ts]
for (let {a, b} of X) {
}

//// [parserES5ForOfStatement13.js]
for (let _a = void 0, a = _a.a, b = _a.b of X) {
}

//// [parserES5ForOfStatement14.ts]
for (let [a, b] of X) {
}

//// [parserES5ForOfStatement14.js]
for (let _a = void 0, a = _a[0], b = _a[1] of X) {
}

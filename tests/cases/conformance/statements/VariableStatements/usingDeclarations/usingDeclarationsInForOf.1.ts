// @target: esnext,es2022,es2017,es2015,es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

for (using d1 of [{ [Symbol.dispose]() {} }, null, undefined]) {
}

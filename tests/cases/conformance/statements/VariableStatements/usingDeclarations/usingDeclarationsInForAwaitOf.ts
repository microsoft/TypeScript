// @target: esnext,es2022,es2017,es2015,es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

async function main() {
    for await (using d1 of [{ [Symbol.dispose]() {} }, null, undefined]) {
    }
}

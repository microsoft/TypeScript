// @target: esnext,es2022,es2017,es2015,es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true
async function main() {
    for (await using d1 = { [Symbol.dispose]() {} },
                    d2 = { async [Symbol.asyncDispose]() {} },
                    d3 = null,
                    d4 = undefined;;) {
    }
}
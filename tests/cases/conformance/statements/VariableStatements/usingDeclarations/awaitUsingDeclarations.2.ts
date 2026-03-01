// @target: esnext,es2022,es2017,es2015,es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

{
    await using d1 = { async [Symbol.asyncDispose]() {} },
                d2 = { async [Symbol.asyncDispose]() {} };
}

export {};
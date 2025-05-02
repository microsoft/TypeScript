// @target: esnext,es2022,es2017,es2015,es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

{
    using d1 = { [Symbol.dispose]() {} },
          d2 = null,
          d3 = undefined,
          d4 = { [Symbol.dispose]() {} };
}

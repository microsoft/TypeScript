// @target: esnext,es2022,es2017,es2015,es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

{
    using d1 = { [Symbol.dispose]() {} },
          d2 = { [Symbol.dispose]() {} };
}

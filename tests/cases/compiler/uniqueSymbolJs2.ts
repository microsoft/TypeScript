// @strict: true
// @lib: esnext
// @allowJS: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// https://github.com/microsoft/TypeScript/issues/61170

// @filename: /index.js
/** @type {unique symbol} */
const x = Symbol()
/** @type {unique symbol} */
const y = Symbol()

/** @type {typeof x} */
let z = x

z == y // error
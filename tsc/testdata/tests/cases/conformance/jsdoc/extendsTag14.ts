// @target: es2015
// @allowJs: true
// @checkJs: true
// @declaration: true
// @outDir: out

// @filename: a.js
/** @template T */
class A {}

/** @extends {A<string>} */
class B extends null {}

/** @augments {A<number>} */
class C extends null {}

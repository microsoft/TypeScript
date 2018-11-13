// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

/**
 * @param {string=} `args`
 * @param `bwarg` {?number?}
 */
function f(args, bwarg) {
}

// @Filename: ts.ts

/**
 * @param `arg` - this is fine
 */
function g(arg: string) {
}

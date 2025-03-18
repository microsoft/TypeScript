//// [tests/cases/compiler/jsdocCastCommentEmit.ts] ////

//// [jsdocCastCommentEmit.ts]
// allowJs: true
// checkJs: true
// outDir: out/
// filename: input.js
function f() {
    return /* @type {number} */ 42;
}

//// [jsdocCastCommentEmit.js]
function f() {
    return 42;
}

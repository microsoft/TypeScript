// @outdir: out/
// @target: esnext
// @module: esnext
// @allowJs: true
// @filename: plainJSGrammarErrors3.js

// @filename: /a.js
function foo() {
    await new Promise(undefined);
}

// @noEmit: true
// @allowJs: true
// @checkJs: true
// @lib: es2017, dom
// @Filename: foo.js
// Repro for #16585
const x = {
    bar() {
        setTimeout(function() { arguments }, 0);
    }
}

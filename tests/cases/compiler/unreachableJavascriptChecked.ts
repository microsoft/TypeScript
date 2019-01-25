// @Filename: unreachable.js
// @allowJs: true
// @checkJs: true
// @outDir: out
// @allowUnreachableCode: false
function unreachable() {
    return f();
    return 2;
    return 3;
    function f() {}
    return 4;
}

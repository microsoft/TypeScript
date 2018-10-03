// @allowJs: true
// @checkJs: true
// @Filename: a.js
var /*1*/x = function foo() {
}
x.a = function bar() {
}
// @Filename: b.ts
var x = function () {
    return 1;
}();

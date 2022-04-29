// @allowJs: true
// @declaration: true
// @outDir: outDir
// @filename: a.ts
class c {
}

// @filename: b.ts
/// <reference path="c.js"/>
function foo() {
}

// @filename: c.js
function bar() {
}
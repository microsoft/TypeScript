// @target: es2015
// @allowJs: true
// @outDir: out
// @declaration: true
// @filename: a.ts
class c {
}

// @filename: b.js
/// <reference path="c.js"/>
function foo() {
}

// @filename: c.js
function bar() {
}

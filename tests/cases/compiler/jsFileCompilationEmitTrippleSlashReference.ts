// @allowJs: true
// @out: out.js
// @declaration: true
// @bundledPackageName: out
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

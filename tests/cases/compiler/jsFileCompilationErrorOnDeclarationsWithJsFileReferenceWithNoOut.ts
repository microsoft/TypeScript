// @allowJs: true
// @declaration: true
// @filename: a.ts
class c {
}

// @filename: b.ts
/// <reference path="c.js"/>
// b.d.ts should have c.d.ts as the reference path
function foo() {
}

// @filename: c.js
function bar() {
}
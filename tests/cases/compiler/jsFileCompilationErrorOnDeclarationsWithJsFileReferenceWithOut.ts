// @allowJs: true
// @out: out.js
// @declaration: true
// @filename: a.ts
class c {
}

// @filename: b.ts
/// <reference path="c.js"/>
// error on above reference when emitting declarations
function foo() {
}

// @filename: c.js
function bar() {
}
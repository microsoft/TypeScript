// @allowJs: true
// @out: out.js
// @filename: a.ts
class c {
}

// @filename: b.ts
/// <reference path="c.js"/>
//no  error on above reference since not emitting declarations
function foo() {
}

// @filename: c.js
function bar() {
}
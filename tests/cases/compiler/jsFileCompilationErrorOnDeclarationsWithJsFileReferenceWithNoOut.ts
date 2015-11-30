// @allowJs: true
// @declaration: true
// @filename: a.ts
class c {
}

// @filename: b.ts
/// <reference path="c.js"/>
// b.d.ts should have c.js as the reference path since we dont emit declarations for js files
function foo() {
}

// @filename: c.js
function bar() {
}
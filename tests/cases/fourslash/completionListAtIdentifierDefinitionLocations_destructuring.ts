/// <reference path='fourslash.ts' />

// @Filename: a.ts
//// var [x/*variable1*/

// @Filename: b.ts
//// var [x, y/*variable2*/

// @Filename: c.ts
//// var [./*variable3*/

// @Filename: d.ts
//// var [x, ...z/*variable4*/

// @Filename: e.ts
//// var {x/*variable5*/

// @Filename: f.ts
//// var {x, y/*variable6*/

// @Filename: g.ts
//// function func1({ a/*parameter1*/

// @Filename: h.ts
//// function func2({ a, b/*parameter2*/

verify.completions({ marker: test.markers(), exact: undefined });
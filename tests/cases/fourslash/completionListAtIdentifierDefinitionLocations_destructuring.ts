/// <reference path='fourslash.ts' />

//// var [x/*variable1*/

//// var [x, y/*variable2*/

//// var [./*variable3*/

//// var [x, ...z/*variable4*/

//// var {x/*variable5*/

//// var {x, y/*variable6*/

//// function func1({ a/*parameter1*/

//// function func2({ a, b/*parameter2*/

verify.completions({ marker: [
  "variable1", "variable2",
  "variable3", "variable4",
  "variable5", "variable6",
  "parameter1"
], exact: undefined });

verify.completions({ marker: "parameter2", includes: [{
  name: "Object", sortText: completion.SortText.GlobalsOrKeywords
}] });

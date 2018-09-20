/// <reference path='fourslash.ts' />

//// var [x/*variable1*/

//// var [x, y/*variable2*/

//// var [./*variable3*/

//// var [x, ...z/*variable4*/

//// var {x/*variable5*/

//// var {x, y/*variable6*/

//// function func1({ a/*parameter1*/

//// function func2({ a, b/*parameter2*/

goTo.eachMarker(() => verify.completionListIsEmpty());

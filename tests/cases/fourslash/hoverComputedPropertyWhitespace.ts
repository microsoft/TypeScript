/// <reference path='fourslash.ts'/>
//// interface Point {
////     ["x" ]: number;
//// }
////
//// const p: Point = { ["x" ]: 42 };
//// p["x"/*hover*/];

goTo.marker("hover");
verify.quickInfoIs('(property) Point["x"]: number');
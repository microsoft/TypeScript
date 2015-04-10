//// [restElementWithAssignmentPattern5.ts]
var s: string, s2: string;
[...[s, s2]] = ["", ""];

//// [restElementWithAssignmentPattern5.js]
var s, s2;
_a = ["", ""], [s, s2] = _a.slice(0);
var _a;

//// [typeFromPropertyAssignment38.ts]
function F() {}
F["prop"] = 3;

const f = function () {};
F["prop"] = 3;


//// [typeFromPropertyAssignment38.js]
"use strict";
function F() { }
F["prop"] = 3;
var f = function () { };
F["prop"] = 3;

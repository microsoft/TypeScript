//// [exportDefaultInterfaceAndValue.ts]
export default interface A { a: string; }
export default function() { return 1; }
declare var x: A;


//// [exportDefaultInterfaceAndValue.js]
"use strict";
exports.__esModule = true;
function default_1() { return 1; }
exports["default"] = default_1;

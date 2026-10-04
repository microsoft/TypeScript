//// [tests/cases/compiler/exportDefaultInterfaceAndValue.ts] ////

//// [exportDefaultInterfaceAndValue.ts]
export default interface A { a: string; }
export default function() { return 1; }
declare var x: A;


//// [exportDefaultInterfaceAndValue.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1() { return 1; }

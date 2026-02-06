//// [tests/cases/compiler/ambientClassOverloadForFunction.ts] ////

//// [ambientClassOverloadForFunction.ts]
declare class foo{};
function foo() { return null; }


//// [ambientClassOverloadForFunction.js]
"use strict";
;
function foo() { return null; }

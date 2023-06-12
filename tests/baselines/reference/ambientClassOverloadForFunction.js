//// [tests/cases/compiler/ambientClassOverloadForFunction.ts] ////

//// [ambientClassOverloadForFunction.ts]
declare class foo{};
function foo() { return null; }


//// [ambientClassOverloadForFunction.js]
;
function foo() { return null; }

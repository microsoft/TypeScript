//// [tests/cases/conformance/dynamicImport/importCallExpressionIncorrect2.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
var x = import { foo } from './0';


//// [0.js]
export function foo() { return "foo"; }
//// [1.js]
var x = ;
export {};

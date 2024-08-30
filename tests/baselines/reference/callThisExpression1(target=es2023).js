//// [tests/cases/conformance/esnext/callThisExpression/callThisExpression1.ts] ////

//// [callThisExpression1.ts]
declare const receiver: number;
declare const fn: (this: number, arg: boolean) => string;

const ok = receiver~>fn(true);



//// [callThisExpression1.js]
"use strict";
const ok = fn.call(receiver, true);

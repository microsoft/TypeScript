//// [tests/cases/conformance/esnext/callThisExpression/callThisExpression2.ts] ////

//// [callThisExpression2.ts]
declare const receiver: number;
declare const badReceiver: string;
declare const fn: (this: number, arg: boolean) => string;

const err1 = receiver~>fn();
const err2 = badReceiver~>fn(true);


//// [callThisExpression2.js]
"use strict";
const err1 = fn.call(receiver);
const err2 = fn.call(badReceiver, true);

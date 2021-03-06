//// [inferenceOptionalPropertiesToIndexSignatures.ts]
declare function foo<T>(obj: { [x: string]: T }): T;

declare const x1: { a: string, b: number };
declare const x2: { a: string, b: number | undefined };
declare const x3: { a: string, b?: number };
declare const x4: { a: string, b?: number | undefined };

let a1 = foo(x1);  // string | number
let a2 = foo(x2);  // string | number | undefined
let a3 = foo(x3);  // string | number
let a4 = foo(x4);  // string | number

// Repro from #43045

const param2 = Math.random() < 0.5 ? 'value2' : null;

const obj = {
    param1: 'value1',
    ...(param2 ? {param2} : {})
};

const query = Object.entries(obj).map(
    ([k, v]) => `${k}=${encodeURIComponent(v)}`
).join('&');


//// [inferenceOptionalPropertiesToIndexSignatures.js]
"use strict";
let a1 = foo(x1); // string | number
let a2 = foo(x2); // string | number | undefined
let a3 = foo(x3); // string | number
let a4 = foo(x4); // string | number
// Repro from #43045
const param2 = Math.random() < 0.5 ? 'value2' : null;
const obj = {
    param1: 'value1',
    ...(param2 ? { param2 } : {})
};
const query = Object.entries(obj).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');

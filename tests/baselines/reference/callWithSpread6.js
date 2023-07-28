//// [tests/cases/conformance/expressions/functionCalls/callWithSpread6.ts] ////

//// [callWithSpread6.ts]
declare const n: number
declare const nntnnnt: [number, number] | [number, number, number]
declare const ntnnnt: [number] | [number, number, number]
declare const ntnnnut: [number] | [number, number, number?]
declare function setHours(a: number, b?: number, c?: number, d?: number): number
declare function setHoursStrict(a: number, b: number, c: number, d: number): number
declare function f(a: number, b: number, ...c: number[]): number
declare function g(a: number, b?: number, ...c: number[]): number
declare function h(a: number, b: number, c: number, ...d: number[]): number

setHours(...nntnnnt)
setHours(...ntnnnt)
setHours(...ntnnnut)
setHours(n, n, ...nntnnnt)
setHoursStrict(n, ...nntnnnt)
setHoursStrict(n, n, ...nntnnnt)
setHours(n, n, n, ...nntnnnt)
setHours(...nntnnnt, n)

f(...ntnnnt)
f(...nntnnnt)
f(...nntnnnt, n)
h(...ntnnnt)
h(...nntnnnt)


//// [callWithSpread6.js]
"use strict";
setHours(...nntnnnt);
setHours(...ntnnnt);
setHours(...ntnnnut);
setHours(n, n, ...nntnnnt);
setHoursStrict(n, ...nntnnnt);
setHoursStrict(n, n, ...nntnnnt);
setHours(n, n, n, ...nntnnnt);
setHours(...nntnnnt, n);
f(...ntnnnt);
f(...nntnnnt);
f(...nntnnnt, n);
h(...ntnnnt);
h(...nntnnnt);

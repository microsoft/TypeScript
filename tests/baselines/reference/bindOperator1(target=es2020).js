//// [bindOperator1.ts]
declare const map: <T, U>(this: T[], callbackFn: (value: T) => U) => U[]
declare const arr: number[]

const ok1 = arr::map
const val1 = ok1(x => x * 10)

const val2 = arr
  ::map(x => ""+x)
  ::map(x => x.slice(1))



//// [bindOperator1.js]
"use strict";
var _a, _b, _c;
const ok1 = (_a = arr, map.bind(_a));
const val1 = ok1(x => x * 10);
const val2 = (_c = (_b = arr, map.bind(_b))(x => "" + x), map.bind(_c))(x => x.slice(1));

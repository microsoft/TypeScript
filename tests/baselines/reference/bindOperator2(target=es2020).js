//// [bindOperator2.ts]
declare const map: <T, U>(this: T[], callbackFn: (value: T) => U) => U[]
declare const arr: number[]
declare const obj: { func: (this: number[]) => number }

const ok1 = arr::obj.func
const val1 = ok1()

const bad1 = obj::obj.func
const bad2 = 0::obj.func





//// [bindOperator2.js]
"use strict";
var _a, _b, _c;
const ok1 = (_a = arr, obj.func.bind(_a));
const val1 = ok1();
const bad1 = (_b = obj, obj.func.bind(_b));
const bad2 = (_c = 0, obj.func.bind(_c));

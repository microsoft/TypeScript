//// [bindOperator3.ts]
declare const func: (num: number) => number
declare const obj1: { func: (this: { foo: string }) => boolean }
declare const obj2: { foo: string; func: (this: { foo: string }) => boolean }

const ok1 = ::obj2.func
const val1 = ok1()
const val2 = (::obj2.func)()

const bad1 = ::obj1.func





//// [bindOperator3.js]
"use strict";
var _a, _b, _c;
const ok1 = (_a = obj2).func.bind(_a);
const val1 = ok1();
const val2 = ((_b = obj2).func.bind(_b))();
const bad1 = (_c = obj1).func.bind(_c);

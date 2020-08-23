// @strict: true
// @target: esnext, es2020

declare const func: (num: number) => number
declare const obj1: { func: (this: { foo: string }) => boolean }
declare const obj2: { foo: string; func: (this: { foo: string }) => boolean }

const ok1 = ::obj2.func
const val1 = ok1()
const val2 = (::obj2.func)()

const bad1 = ::obj1.func




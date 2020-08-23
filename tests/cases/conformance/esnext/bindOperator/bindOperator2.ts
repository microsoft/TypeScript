// @strict: true
// @target: esnext, es2020

declare const map: <T, U>(this: T[], callbackFn: (value: T) => U) => U[]
declare const arr: number[]
declare const obj: { func: (this: number[]) => number }

const ok1 = arr::obj.func
const val1 = ok1()

const bad1 = obj::obj.func
const bad2 = 0::obj.func




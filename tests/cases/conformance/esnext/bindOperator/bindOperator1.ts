// @strict: true
// @target: esnext, es2020

declare const map: <T, U>(this: T[], callbackFn: (value: T) => U) => U[]
declare const arr: number[]

const ok1 = arr::map
const val1 = ok1(x => x * 10)

const val2 = arr
  ::map(x => ""+x)
  ::map(x => x.slice(1))


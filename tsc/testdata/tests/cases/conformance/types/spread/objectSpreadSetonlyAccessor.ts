// @strict: true
// @target: esnext
const o1: { foo: number, bar: undefined } = { foo: 1, ... { set bar(_v: number) { } } }
const o2: { foo: undefined } = { foo: 1, ... { set foo(_v: number) { } } }

// @strict: true
declare const n: number
declare const nnnu: [number, number, number?]
declare const nntnnnt: [number, number] | [number, number, number]
declare const ns: number[]
declare const nununu: [number?, number?, number?]
declare const nu: [number?]
declare function setHours(a: number, b?: number, c?: number, d?: number): number
declare function f(a: number, b: number, ...c: number[]): number
declare function g(a: number, b?: number, ...c: number[]): number

setHours(...nnnu, n)
setHours(...nntnnnt, n)

// TODO: Handle labels too

f(...nnnu, n) // maybe add special rules for trailing undefineds in spread tuples -> rests
f(...nntnnnt, n)

g(n, ...ns, n)
g(n, ...nununu, n)
g(n, ...nu, n)

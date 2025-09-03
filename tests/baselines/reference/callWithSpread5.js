//// [tests/cases/conformance/expressions/functionCalls/callWithSpread5.ts] ////

//// [callWithSpread5.ts]
declare const x: number
declare const nnnu: [number, number, number?]
declare const nntnnnt: [number, number] | [number, number, number]
declare function fn(a: number, b: number, bb: number, ...c: number[]): number

fn(...nnnu, x)
fn(...nntnnnt, x)


//// [callWithSpread5.js]
fn(...nnnu, x);
fn(...nntnnnt, x);

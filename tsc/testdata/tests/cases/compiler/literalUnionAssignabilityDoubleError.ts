// @strict: true

declare const x: "a" | "b";
const y: number = x;

function foo(param: number) {}
foo(x);

function bar(): number {
    return x;
}

declare const nums: 1 | 2;
const s: string = nums;

declare const bigints: 0n | 1n;
const sym: symbol = bigints;

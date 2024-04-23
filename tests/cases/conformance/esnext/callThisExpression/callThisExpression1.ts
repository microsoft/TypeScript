// @strict: true
// @target: esnext, es2023

declare const receiver: number;
declare const fn: (this: number, arg: boolean) => string;

const ok = receiver~>fn(true);


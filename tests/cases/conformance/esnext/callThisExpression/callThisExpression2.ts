// @strict: true
// @target: esnext, es2023

declare const receiver: number;
declare const badReceiver: string;
declare const fn: (this: number, arg: boolean) => string;

const err1 = receiver~>fn();
const err2 = badReceiver~>fn(true);

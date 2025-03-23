// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57706

declare function infer1<T>(fn: Factory<T>): T;
declare function infer2<T>(fn: Factory2<T>): T;

export type Factory<T> = (arg1: T, arg2: any) => any;
export type Factory2<T> = (...args: [T, any]) => any;

const f1 = (msg: string = "hello", test: any) => {};
const a1 = infer1(f1);
const a2 = infer2(f1);

const f2 = (msg: string = "hello") => {};
const b1 = infer1(f2);
const b2 = infer2(f2);

const c1 = infer1((msg: string = "hello") => {});
const c2 = infer2((msg: string = "hello") => {});

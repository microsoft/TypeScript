//// [inferThisType.ts]
declare function f<T>(g: (this: T) => void): T
declare function h(this: number): void;
f(h)

// works with infer types as well
type Check<T> = T extends (this: infer U, ...args: any[]) => any ? string : unknown;
type r1 = Check<(this: number) => void>; // should be string

type This<T>  = T extends (this: infer U, ...args: any[]) => any ? U : unknown;
type r2 = This<(this: number) => void>; // should be number


//// [inferThisType.js]
f(h);

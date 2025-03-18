//// [tests/cases/compiler/selfReferentialFunctionType.ts] ////

//// [selfReferentialFunctionType.ts]
declare function f<T>(args: typeof f<T>): T;
declare function g<T = typeof g>(args: T): T;
declare function h<T>(): typeof h<T>;


//// [selfReferentialFunctionType.js]

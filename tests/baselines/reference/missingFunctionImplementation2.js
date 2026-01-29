//// [tests/cases/compiler/missingFunctionImplementation2.ts] ////

//// [missingFunctionImplementation2_a.ts]
export {};
declare module "./missingFunctionImplementation2_b" {
  export function f(a, b): void;
}

//// [missingFunctionImplementation2_b.ts]
export function f(a?, b?);

//// [missingFunctionImplementation2_a.js]
export {};
//// [missingFunctionImplementation2_b.js]
export {};

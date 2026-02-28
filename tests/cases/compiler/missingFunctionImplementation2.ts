// @module: commonjs
// @target: es2015
// @strict: false
// @Filename: missingFunctionImplementation2_a.ts
export {};
declare module "./missingFunctionImplementation2_b" {
  export function f(a, b): void;
}

// @Filename: missingFunctionImplementation2_b.ts
export function f(a?, b?);
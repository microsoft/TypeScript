//// [tests/cases/compiler/importUsedAsTypeWithErrors.ts] ////

//// [test.ts]
export interface T {
    value: string
}

//// [main.ts]
export const a: import("./test") = null;


//// [test.js]
export {};
//// [main.js]
export const a = null;

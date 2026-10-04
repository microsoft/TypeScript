//// [tests/cases/compiler/isolatedModulesNoEmitOnError.ts] ////

//// [file1.ts]
export const x: string = 3;



!!!! File file1.js missing from original emit, but present in noCheck emit
//// [file1.js]
export const x = 3;

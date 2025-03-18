//// [tests/cases/compiler/simpleTestMultiFile.ts] ////

//// [foo.ts]
const x: number = "";

//// [bar.ts]
const y: string = 1;

//// [foo.js]
const x = "";
//// [bar.js]
const y = 1;

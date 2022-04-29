//// [tests/cases/compiler/moduleResolution_automaticTypeDirectiveNames.ts] ////

//// [index.d.ts]
declare const a: number;

//// [index.d.ts]
declare const a: string;

//// [a.ts]
a;


//// [a.js]
a;

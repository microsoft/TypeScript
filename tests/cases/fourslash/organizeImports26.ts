/// <reference path='fourslash.ts' />

//// export * from './file1.js';
//// export * from './file2.js';
////

verify.organizeImports(
`export * from './file1.js';
export * from './file2.js';
`
);

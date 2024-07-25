/// <reference path='fourslash.ts' />

//// export * from './file4.js';
//// export * from './file3.js';
////
//// export * from './file2.js';
//// export * from './file1.js';

verify.organizeImports(
`export * from './file3.js';
export * from './file4.js';

export * from './file1.js';
export * from './file2.js';`
);

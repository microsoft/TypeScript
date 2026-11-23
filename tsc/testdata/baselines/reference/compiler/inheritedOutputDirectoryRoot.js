//// [tests/cases/compiler/inheritedOutputDirectoryRoot.ts] ////

//// [base.json]
{ "compilerOptions": { "outDir": "dist" } }

//// [index.ts]
export const value = 0;


//// [/project/dist/src/index.js]
export const value = 0;

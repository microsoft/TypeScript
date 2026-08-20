//// [tests/cases/conformance/es2020/modules/exportAsNamespace_nonExistent.ts] ////

//// [exportAsNamespace_nonExistent.ts]
export * as ns from './nonexistent'; // Error


//// [exportAsNamespace_nonExistent.js]
export * as ns from './nonexistent'; // Error

/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true
// @moduleResolution: node
// @noUnusedLocals: true
// @target: es2018

//// type A = string;
//// type B = string;
//// const C = "hello";
//// export { A, type B, C };

verify.organizeImports(
`type A = string;
type B = string;
const C = "hello";
export { A, C, type B };
`,
    undefined, 
    { organizeImportsTypeOrder : "last" }
);
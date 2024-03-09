/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true
// @moduleResolution: node
// @noUnusedLocals: true
// @target: es2018

//// type A = string;
//// type B = string;
//// const C = "hello";
//// export { A, type B, C };

// default behavior is equivalent to "last"
verify.organizeImports(
`type A = string;
type B = string;
const C = "hello";
export { A, C, type B };
`
);

verify.organizeImports(
`type A = string;
type B = string;
const C = "hello";
export { A, type B, C };
`,
    undefined, 
    { organizeImportsTypeOrder : "inline" }
);

verify.organizeImports(
`type A = string;
type B = string;
const C = "hello";
export { type B, A, C };
`,
    undefined, 
    { organizeImportsTypeOrder : "first" }
);

verify.organizeImports(
`type A = string;
type B = string;
const C = "hello";
export { A, C, type B };
`,
    undefined, 
    { organizeImportsTypeOrder : "last" }
);
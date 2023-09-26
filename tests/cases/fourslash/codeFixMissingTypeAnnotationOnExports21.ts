/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
////export const a = {
////    z: Symbol()
////} as const;

verify.codeFixAvailable([
    { description: "Add annotation of type '{ readonly z: symbol; }'" }
]);

verify.codeFix({
    description: "Add annotation of type '{ readonly z: symbol; }'",
    index: 0,
    newFileContent:
`export const a: { readonly z: symbol; } = {
    z: Symbol()
} as const;`
});

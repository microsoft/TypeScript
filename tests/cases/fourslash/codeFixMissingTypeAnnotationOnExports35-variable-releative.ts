/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @Filename: /code.ts
////const foo = { a: 1 }
////export const exported = foo;

verify.codeFix({
    description: "Add annotation of type 'typeof foo'" ,
    index: 1,
    newFileContent:
`const foo = { a: 1 }
export const exported: typeof foo = foo;`
});

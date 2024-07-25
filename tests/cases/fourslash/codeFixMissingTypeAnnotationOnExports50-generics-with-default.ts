/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @file lib.d.ts
////interface MyIterator<T, TReturn = any, TNext = undefined> {}
////let x: MyIterator<number>;
////export const y = x;

verify.codeFix({
    description: "Add annotation of type 'MyIterator<number>'",
    index: 0,
    newFileContent:
`interface MyIterator<T, TReturn = any, TNext = undefined> {}
let x: MyIterator<number>;
export const y: MyIterator<number> = x;`,
});

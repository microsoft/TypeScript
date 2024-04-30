/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////let c: string[] = [];
////export let o = {
////    p: Math.random() ? []: [
////        ...c
////    ]
////}

verify.codeFix({
    description: `Extract to variable and replace with 'newLocal as typeof newLocal'`,
    applyChanges: true,
    index: 2,
    newFileContent:
`let c: string[] = [];
const newLocal = Math.random() ? [] : [
    ...c
];
export let o = {
    p: newLocal as typeof newLocal
}`
});


verify.codeFix({
    description: `Add annotation of type 'string[]'`,
    applyChanges: true,
    index: 0,
    newFileContent:
`let c: string[] = [];
const newLocal: string[] = Math.random() ? [] : [
    ...c
];
export let o = {
    p: newLocal as typeof newLocal
}`
});

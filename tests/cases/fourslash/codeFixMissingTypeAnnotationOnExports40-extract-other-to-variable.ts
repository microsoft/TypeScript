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
    description: `Extract to variable and replace with 'o_p typeof o_p'`,
    applyChanges: true,
    index: 2,
    newFileContent:
`let c: string[] = [];
const o_p = Math.random() ? [] : [
    ...c
];
export let o = {
    p: o_p as typeof o_p
}`
});


verify.codeFix({
    description: `Add annotation of type 'string[]'`,
    applyChanges: true,
    index: 0,
    newFileContent:
`let c: string[] = [];
const o_p: string[] = Math.random() ? [] : [
    ...c
];
export let o = {
    p: o_p as typeof o_p
}`
});
/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////let c: string[] = [];
////export let o = {
////    p: [
////        ...c
////    ]
////}

verify.codeFix({
    description: `Mark array literal as const`,
    applyChanges: true,
    index: 2,
    newFileContent:
`let c: string[] = [];
export let o = {
    p: [
        ...c
    ] as const
}`
});

verify.codeFix({
    description: `Extract to variable and replace with 'o_p typeof o_p'`,
    applyChanges: true,
    index: 1,
    newFileContent:
`let c: string[] = [];
const o_p = [
    ...c
] as const;
export let o = {
    p: o_p as typeof o_p
}`
});

verify.codeFix({
    description: `Add annotation of type 'readonly string[]'`,
    applyChanges: true,
    index: 0,
    newFileContent:
`let c: string[] = [];
const o_p: readonly string[] = [
    ...c
] as const;
export let o = {
    p: o_p as typeof o_p
}`
});
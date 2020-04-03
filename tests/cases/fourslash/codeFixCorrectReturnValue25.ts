/// <reference path='fourslash.ts' />

//// function Foo (a: () => number) { a() }
//// Foo(() => { /* leading */ 1 /* trailing */ })

verify.codeFix({
    description: "Remove block body braces",
    index: 1,
    newFileContent: 
`function Foo (a: () => number) { a() }
Foo(() => /* leading */ 1 /* trailing */)`
})
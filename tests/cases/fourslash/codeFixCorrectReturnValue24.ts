/// <reference path='fourslash.ts' />

//// function Foo (a: () => number) { a() }
//// Foo(() => { /* leading */ 1 /* trailing */ })

verify.codeFix({
    description: "Add a return statement",
    index: 0,
    newFileContent: 
`function Foo (a: () => number) { a() }
Foo(() => { /* leading */ return 1 /* trailing */ })`
})
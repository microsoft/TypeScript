/// <reference path='fourslash.ts' />

//// function Foo (a: () => number) { a() }
//// Foo(() => { /* leading */ 1 /* trailing */ })

verify.codeFix({
    description: ts.Diagnostics.Remove_braces_from_arrow_function_body.message,
    index: 1,
    newFileContent: 
`function Foo (a: () => number) { a() }
Foo(() => /* leading */ 1 /* trailing */)`
})
/// <reference path='fourslash.ts' />

// @noImplicitAny: false
////[|let x
////|]
////x ??= 1
////x ||= "2"
////x &&= true

verify.codeFix({
    description: "Infer type of 'x' from usage",
    index: 0,
    newRangeContent: 'let x: string | number | boolean\n',
})

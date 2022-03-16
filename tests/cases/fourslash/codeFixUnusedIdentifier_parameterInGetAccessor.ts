/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////let foo = {
////    get x(/**/param) {}
////}

verify.codeFix({
    description: "Remove unused declaration for: 'param'",
    index: 0,
    newFileContent:
`let foo = {
    get x() {}
}`
})

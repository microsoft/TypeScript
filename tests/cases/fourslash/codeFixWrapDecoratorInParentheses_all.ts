/// <reference path='fourslash.ts' />

////declare var x: any;
////class C {
////    @x?.y
////    bar() {}
////
////    @x?.()
////    baz() {}
////}

verify.codeFixAll({
    fixId: "wrapDecoratorInParentheses",
    fixAllDescription: "Wrap all invalid decorator expressions in parentheses",
    newFileContent:
`declare var x: any;
class C {
    @(x?.y)
    bar() {}

    @(x?.())
    baz() {}
}`
});

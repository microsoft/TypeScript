/// <reference path='fourslash.ts' />

////declare function foo(): (...args: any[]) => void;
////class C {
////    @foo
////    bar() {}
////
////    @foo
////    baz() {}
////}

verify.codeFixAll({
    actionId: "addMissingInvocationForDecorator",
    newFileContent:
`declare function foo(): (...args: any[]) => void;
class C {
    @foo()
    bar() {}

    @foo()
    baz() {}
}`
});

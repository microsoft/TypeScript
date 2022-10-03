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
    fixId: "addMissingInvocationForDecorator",
    fixAllDescription: "Add '()' to all uncalled decorators",
    newFileContent:
`declare function foo(): (...args: any[]) => void;
class C {
    @foo()
    bar() {}

    @foo()
    baz() {}
}`
});

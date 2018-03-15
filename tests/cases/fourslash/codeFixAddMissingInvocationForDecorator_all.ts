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
    fixAllDescription: "Fix all like: Call decorator expression",
    newFileContent:
`declare function foo(): (...args: any[]) => void;
class C {
    @foo()
    bar() {}

    @foo()
    baz() {}
}`
});

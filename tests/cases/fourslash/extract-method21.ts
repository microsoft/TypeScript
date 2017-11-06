/// <reference path='fourslash.ts' />

// Extracting from a static method should create a static method

//// class Foo {
////     static method() {
////         /*start*/return 1;/*end*/
////     }
//// }

goTo.select('start', 'end')

verify.refactorAvailable('Extract Symbol', 'function_scope_1');

edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to method in class 'Foo'",
    newContent:
`class Foo {
    static method() {
        return Foo./*RENAME*/newMethod();
    }

    private static newMethod() {
        return 1;
    }
}`
});

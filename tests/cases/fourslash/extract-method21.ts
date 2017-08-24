/// <reference path='fourslash.ts' />

// Extracting from a static method should create a static method

//// class Foo {
////     static method() {
////         /*start*/return 1;/*end*/
////     }
//// }

goTo.select('start', 'end')

verify.refactorAvailable('Extract Method');

edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_0",
    actionDescription: "Extract function into class 'Foo'",
    newContent:
`class Foo {
    static method() {
        return Foo./*RENAME*/newFunction();
    }

    private static newFunction() {
        return 1;
    }
}`
});

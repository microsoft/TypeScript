/// <reference path='fourslash.ts' />

// Extracting from a static method should create a static method

//// class Foo {
////     static method() {
////         /*start*/return 1;/*end*/
////     }
//// }

goTo.select('start', 'end')

verify.refactorAvailable('Extract Method');

edit.applyRefactor('Extract Method', "scope_0");

verify.currentFileContentIs(`class Foo {
    static method() {
        return Foo.newFunction();
    }

    private static newFunction() {
        return 1;
    }
}`);
/// <reference path='fourslash.ts' />

// Extracting from a static context should make static methods.
// Also checks that we correctly find non-conflicting names in static contexts.

//// class C {
////     static j = /*c*/100/*d*/;
////     constructor(q: string = /*a*/"hello"/*b*/) {
////     }
//// }

goTo.select('a', 'b');
edit.applyRefactor('Extract Method', 'scope_0');

goTo.select('c', 'd');
edit.applyRefactor('Extract Method', 'scope_0');

verify.currentFileContentIs(`class C {
    static j = C.newFunction_1();
    constructor(q: string = C.newFunction()) {
    }

    private static newFunction(): string { return "hello"; }

    private static newFunction_1() { return 100; }
}`);
/// <reference path='fourslash.ts' />

// Extracting from a static context should make static methods.
// Also checks that we correctly find non-conflicting names in static contexts.

//// class C {
////     static j = /*c*/1 + 1/*d*/;
////     constructor(q: string = /*a*/"hello"/*b*/) {
////     }
//// }

goTo.select('a', 'b');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to method in class 'C'",
    newContent:
`class C {
    static j = 1 + 1;
    constructor(q: string = C./*RENAME*/newMethod()) {
    }

    private static newMethod(): string {
        return "hello";
    }
}`
});

verify.currentFileContentIs(`class C {
    static j = 1 + 1;
    constructor(q: string = C.newMethod()) {
    }

    private static newMethod(): string {
        return "hello";
    }
}`);

goTo.select('c', 'd');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to method in class 'C'",
    newContent:
`class C {
    static j = C./*RENAME*/newMethod_1();
    constructor(q: string = C.newMethod()) {
    }

    private static newMethod_1() {
        return 1 + 1;
    }

    private static newMethod(): string {
        return "hello";
    }
}`
});

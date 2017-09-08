/// <reference path='fourslash.ts' />

// Extracting from a static context should make static methods.
// Also checks that we correctly find non-conflicting names in static contexts.

//// class C {
////     static j = /*c*/1 + 1/*d*/;
////     constructor(q: string = /*a*/"a" + "b"/*b*/) {
////     }
//// }

goTo.select('a', 'b');
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_0",
    actionDescription: "Extract function into class 'C'",
    newContent:
`class C {
    static j = 1 + 1;
    constructor(q: string = C./*RENAME*/newFunction()) {
    }

    private static newFunction(): string {
        return "a" + "b";
    }
}`
});

goTo.select('c', 'd');
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_0",
    actionDescription: "Extract function into class 'C'",
    newContent:
`class C {
    static j = C./*RENAME*/newFunction_1();
    constructor(q: string = C.newFunction()) {
    }

    private static newFunction(): string {
        return "a" + "b";
    }

    private static newFunction_1() {
        return 1 + 1;
    }
}`
});

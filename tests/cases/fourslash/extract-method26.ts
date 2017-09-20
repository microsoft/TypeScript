/// <reference path='fourslash.ts' />

// Handle having zero modifiers on a method.

// @allowNonTsExtensions: true
// @Filename: file1.js
//// class C {
////     M() {
////         const q = /*a*/1 + 2/*b*/;
////         q.toString();
////     }
//// }

goTo.select('a', 'b')
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_0",
    actionDescription: "Extract function into class 'C'",
    newContent:
`class C {
    M() {
        const q = this./*RENAME*/newFunction();
        q.toString();
    }

    newFunction() {
        return 1 + 2;
    }
}`
});

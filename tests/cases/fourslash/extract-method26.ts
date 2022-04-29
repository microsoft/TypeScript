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
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to method in class 'C'",
    newContent:
`class C {
    M() {
        const q = this./*RENAME*/newMethod();
        q.toString();
    }

    newMethod() {
        return 1 + 2;
    }
}`
});

/// <reference path='fourslash.ts' />

//// const b = (a: number) /*a*/=>/*b*/ { /* missing */
////    return a; /* missing */
////  }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Remove braces from arrow function",
    actionDescription: "Remove braces from arrow function",
    newContent: `const b = (a: number) => /* missing */ a; /* missing */`,
});

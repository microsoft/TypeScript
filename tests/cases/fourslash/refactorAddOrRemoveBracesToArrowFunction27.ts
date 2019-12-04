/// <reference path='fourslash.ts' />

//// const b = (a: number) /*a*/=>/*b*/ { /* leading */
////  return a; /* trailing */
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Remove braces from arrow function",
    actionDescription: "Remove braces from arrow function",
    newContent: `const b = (a: number) => /* leading */ a /* trailing */`,
});

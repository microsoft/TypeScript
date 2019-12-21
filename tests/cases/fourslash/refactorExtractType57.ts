/// <reference path='fourslash.ts' />

// Where do lines get inserted?
// The exact structure here doesn't matter,
// just want to see something within a block body
// to have the behavior defined in tests.
//// function id<T>(x: T): T {
////     return (() => {
////         const s: /*a*/typeof x/*b*/ = x;
////         return s;
////     })();
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `function id<T>(x: T): T {
    return (() => {
        type /*RENAME*/NewType = typeof x;

        const s: NewType = x;
        return s;
    })();
}`,
});

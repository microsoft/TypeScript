/// <reference path='fourslash.ts' />

////const a = /*a*/()/*b*/ => (
////    // comment
////    1
////);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Add braces to arrow function",
    actionDescription: "Add braces to arrow function",
    newContent: `const a = () => {
    return (
        // comment
        1
    );
};`,
});

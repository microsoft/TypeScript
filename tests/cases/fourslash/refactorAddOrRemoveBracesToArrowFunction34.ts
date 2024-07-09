/// <reference path='fourslash.ts' />

////const a = /*a*/()/*b*/ => (
////    /*
////    multi-line comment
////    */
////    1
////);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Add braces to arrow function",
    actionDescription: "Add braces to arrow function",
    newContent: `const a = () => {
    return (
        /*
        multi-line comment
        */
        1
    );
};`,
});

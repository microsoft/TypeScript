/// <reference path='fourslash.ts' />

////console.log(function /*a*/()/*b*/ {
////    console.log(1);
////    console.log(2);
////    return 3;
////})

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `console.log(() => {
    console.log(1);
    console.log(2);
    return 3;
})`,
});

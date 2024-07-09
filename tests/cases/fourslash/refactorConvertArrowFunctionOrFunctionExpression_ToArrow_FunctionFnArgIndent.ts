/// <reference path='fourslash.ts' />

////function foo() {
////    const a = {
////        b: builder.create(function /*a*/()/*b*/ {
////            console.log(1);
////            console.log(2);
////            return 3;
////        })
////    }
////}


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `function foo() {
    const a = {
        b: builder.create(() => {
            console.log(1);
            console.log(2);
            return 3;
        })
    }
}`,
});

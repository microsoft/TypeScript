/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() {
////     console.log("noot noot");
//// }
//// function bar() {
////     /*x*/foo/*w*/();
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar() {
    console.log("noot noot");
    
}`
});

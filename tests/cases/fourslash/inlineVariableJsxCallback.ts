/// <reference path='fourslash.ts'/>

//@module: commonjs
//@jsx: preserve

// @Filename: file.tsx
////function Button() {
////    const /*a*/onClick/*b*/ = () => {
////        console.log("clicked");
////    };
////
////    return (
////        <button onClick={onClick}>
////            Click me!
////        </button>
////    );
////}

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `function Button() {

    return (
        <button onClick={() => {
            console.log("clicked");
        }}>
            Click me!
        </button>
    );
}`
});
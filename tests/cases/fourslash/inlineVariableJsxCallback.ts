/// <reference path='fourslash.ts'/>

//@module: commonjs
//@jsx: preserve

// @Filename: file.tsx
////function Button() {
////    const onClick /**/ = () => {
////        console.log("clicked");
////    };
////
////    return (
////        <button onClick={onClick}>
////            Click me!
////        </button>
////    );
////}

goTo.marker("");
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
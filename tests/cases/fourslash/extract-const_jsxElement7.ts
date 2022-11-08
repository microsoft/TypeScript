/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: a.tsx
////function Foo() {
////    const foo = [
////        /*a*/<div>' {1}</div>/*b*/
////    ];
////}

goTo.file("a.tsx");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_1",
    actionDescription: "Extract to constant in global scope",
    newContent:
`const newLocal = <div>' {1}</div>;
function Foo() {
    const foo = [
        /*RENAME*/newLocal
    ];
}`
});

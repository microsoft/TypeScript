/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: a.tsx
////function Foo() {
////    const foo = [
////        /*a*/<div>'" <span></span></div>/*b*/
////    ];
////}

goTo.file("a.tsx");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_1",
    actionDescription: "Extract to constant in global scope",
    newContent:
`const newLocal = <div>'" <span></span></div>;
function Foo() {
    const foo = [
        /*RENAME*/newLocal
    ];
}`
});

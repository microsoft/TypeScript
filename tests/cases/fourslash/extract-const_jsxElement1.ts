/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: a.tsx
////function Foo() {
////    return (
////        <div>
////            /*a*/<span></span>/*b*/
////        </div>
////    );
////}

goTo.file("a.tsx");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_1",
    actionDescription: "Extract to constant in global scope",
    newContent:
`const /*RENAME*/newLocal = <span></span>;
function Foo() {
    return (
        <div>
            {newLocal}
        </div>
    );
}`
});

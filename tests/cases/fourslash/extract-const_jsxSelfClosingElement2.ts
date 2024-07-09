/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: a.tsx
////function Foo() {
////    return (
////        <div>
////            /*a*/<br />/*b*/
////        </div>
////    );
////}

goTo.file("a.tsx");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`function Foo() {
    const /*RENAME*/newLocal = <br />;
    return (
        <div>
            {newLocal}
        </div>
    );
}`
});

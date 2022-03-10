/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: a.tsx
////function Foo() {
////    return (
////        <div>
////            /*a*/<></>/*b*/
////        </div>
////    );
////}

goTo.file("a.tsx");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`function Foo() {
    return (
        <div>
            {newFunction()}
        </div>
    );
}

function /*RENAME*/newFunction() {
    return <></>;
}
`
});

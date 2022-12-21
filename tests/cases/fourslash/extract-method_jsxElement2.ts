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
    actionName: "function_scope_0",
    actionDescription: "Extract to inner function in function 'Foo'",
    newContent:
`function Foo() {
    return (
        <div>
            {newFunction()}
        </div>
    );

    function /*RENAME*/newFunction() {
        return <span></span>;
    }
}`
});

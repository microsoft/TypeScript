/// <reference path='fourslash.ts' />

// GH#35372

// @jsx: preserve
// @filename: main.tsx
////function foo() {
////    return <div>/*a*/<a>content</a>/*b*/</div>;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
        `function foo() {
    const /*RENAME*/newLocal = <a>content</a>;
    return <div>{newLocal}</div>;
}`
});

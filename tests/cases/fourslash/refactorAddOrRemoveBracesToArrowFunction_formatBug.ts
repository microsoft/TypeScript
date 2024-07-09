/// <reference path='fourslash.ts' />

// @Filename: /a.tsx
////const x = () /*a*/=>/*b*/
////           <div>:</div>

// This code with this exact indent level used to crash in `indentMultilineCommentOrJsxText`.

goTo.select("a", "b");

edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Add braces to arrow function",
    actionDescription: "Add braces to arrow function",
    newContent:
`const x = () =>
           {
        return <div>:</div>;
    }`,
});

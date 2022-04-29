/// <reference path='fourslash.ts' />

////const foo = /*a*/(a: number, b: number)/*b*/ => { };
////foo(1, 2);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `const foo = ({ a, b }: { a: number; b: number; }) => { };
foo({ a: 1, b: 2 });`
});
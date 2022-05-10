/// <reference path='fourslash.ts' />

////const foo = /*a*/(a: number)/*b*/ => { };
////foo(1);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `const foo = ({ a }: { a: number; }) => { };
foo({ a: 1 });`,
});

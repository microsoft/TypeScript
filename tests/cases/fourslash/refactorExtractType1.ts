/// <reference path='fourslash.ts' />

//// var x: /*a*/{ a?: number, b?: string }/*b*/ = { };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type NewType = {
    a?: number;
    b?: string;
};

var x: NewType = { };`,
});

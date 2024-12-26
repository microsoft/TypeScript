/// <reference path="fourslash.ts" />

////const /*a*/pizza/*b*/ = "🍕";
////export const prompt = `Hello, would you like some ${((pizza))}?`;

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "export const prompt = `Hello, would you like some 🍕?`;"
});
/// <reference path="fourslash.ts" />

////const /*a*/codeText/*b*/ = "Code-formatted text looks `like this` and requires surrounding by backticks (\\`).";
////export const mdTutorial = `Let's talk about markdown.\n${codeText}?`;

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "export const mdTutorial = `Let's talk about markdown.\\nCode-formatted text looks \\`like this\\` and requires surrounding by backticks (\\\\\\\`).?`;"
});
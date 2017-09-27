/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function Test1() {}
////export function Test2() {}

// @Filename: /b.ts
////import { Test2 } from "./a";
////t/**/

goTo.marker("");
verify.completionListContains("Test1", "function Test1(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);
verify.completionListContains("Test2", "import Test2", "", "alias", /*spanIndex*/ undefined, /*hasAction*/ undefined);

verify.applyCodeActionFromCompletion("", {
    name: "Test1",
    description: `Add 'Test1' to existing import declaration from "./a".`,
    newFileContent: `import { Test2, Test1 } from "./a";
t`,
});

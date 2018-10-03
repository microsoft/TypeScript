/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function Test1() {}
////export function Test2() {}

// @Filename: /b.ts
////import { Test2 } from "./a";
////t/**/

goTo.marker("");
const options = { includeExternalModuleExports: true, sourceDisplay: undefined };
verify.completionListContains({ name: "Test1", source: "/a" }, "function Test1(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true, { ...options, sourceDisplay: "./a" });
verify.completionListContains("Test2", "(alias) function Test2(): void\nimport Test2", "", "alias", /*spanIndex*/ undefined, /*hasAction*/ undefined, options);
verify.not.completionListContains({ name: "Test2", source: "/a" }, undefined, undefined, undefined, undefined, undefined, options);

verify.applyCodeActionFromCompletion("", {
    name: "Test1",
    source: "/a",
    description: `Add 'Test1' to existing import declaration from "./a"`,
    newFileContent: `import { Test2, Test1 } from "./a";
t`,
});

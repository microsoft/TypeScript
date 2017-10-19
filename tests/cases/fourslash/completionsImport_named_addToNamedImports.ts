/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function foo() {}
////export const x = 0;

// @Filename: /b.ts
////import { x } from "./a";
////f/**/;

goTo.marker("");
verify.completionListContains("foo", "function foo(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    description: `Add 'foo' to existing import declaration from "./a".`,
    newFileContent: `import { x, foo } from "./a";
f;`,
});

/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function foo() {}

// @Filename: /b.ts
////import * as a from "./a";
////f/**/;

goTo.marker("");
verify.completionListContains({ name: "foo", source: "/a" }, "function foo(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Add 'foo' to existing import declaration from "./a".`,
    newFileContent: `import foo, * as a from "./a";
f;`,
});

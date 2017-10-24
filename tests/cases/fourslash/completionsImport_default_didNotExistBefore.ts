/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function foo() {}

// @Filename: /b.ts
////f/**/;

goTo.marker("");
verify.completionListContains("foo", "function foo(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    description: `Import 'foo' from "./a".`,
    // TODO: GH#18445
    newFileContent: `import foo from "./a";\r
\r
f;`,
});

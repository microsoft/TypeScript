/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////export default function foo() {}

// @Filename: /b.ts
////f/**/;

goTo.marker("");
verify.completionListContains({ name: "foo", source: "/a" }, "function foo(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a".`,
    // TODO: GH#18445
    newFileContent: `import foo from "./a";\r
\r
f;`,
});

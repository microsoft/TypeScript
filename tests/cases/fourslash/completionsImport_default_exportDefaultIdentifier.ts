/// <reference path="fourslash.ts" />

// Tests that we use the name "foo".

// @Filename: /a.ts
////const foo = 0;
////export default foo;

// @Filename: /b.ts
////f/**/;

goTo.marker("");
verify.completionListContains({ name: "foo", source: "/a" }, "export default foo", "", "alias", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a"`,
    // TODO: GH#18445
    newFileContent: `import foo from "./a";\r
\r
f;`,
});

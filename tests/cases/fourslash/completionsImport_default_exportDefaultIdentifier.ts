/// <reference path="fourslash.ts" />

// Tests that we use the name "foo".

// @module: esnext

// @Filename: /a.ts
////const foo = 0;
////export default foo;

// @Filename: /b.ts
////f/**/;

goTo.marker("");
verify.completionListContains({ name: "foo", source: "/a" }, "(alias) const foo: 0\nexport default foo", "", "alias", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeCompletionsForModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import default 'foo' from module "./a"`,
    newFileContent: `import foo from "./a";

f;`,
});

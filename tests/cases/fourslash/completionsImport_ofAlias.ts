/// <reference path="fourslash.ts" />

// Tests that we don't filter out a completion for an alias,
// so long as it's not an alias to a different module.

// @Filename: /a.ts
////const foo = 0;
////export { foo };

// @Filename: /a_reexport.ts
// Should not show up in completions
////export { foo } from "./a";

// @Filename: /b.ts
////fo/**/

goTo.marker("");
// https://github.com/Microsoft/TypeScript/issues/14003
verify.completionListContains({ name: "foo", source: "/a" }, "import foo", "", "alias", /*spanIndex*/ undefined, /*hasAction*/ true);
verify.not.completionListContains({ name: "foo", source: "/a_reexport" });

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from "./a".`,
    // TODO: GH#18445
    newFileContent: `import { foo } from "./a";\r
\r
fo`,
});

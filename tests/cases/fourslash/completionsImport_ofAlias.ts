/// <reference path="fourslash.ts" />

// Tests that we don't filter out a completion for an alias,
// so long as it's not an alias to a different module.

// @Filename: /a.ts
////const foo = 0;
////export { foo };

// @Filename: /a_reexport.ts
// Should not show up in completions
////export { foo } from "./a";

// @Filename: /a_reexport_2.ts
////export * from "./a";

// @Filename: /b.ts
////fo/**/

goTo.marker("");
const options = { includeExternalModuleExports: true, sourceDisplay: "./a" };
// TODO: https://github.com/Microsoft/TypeScript/issues/14003
//TODO: verify that there's only one!
verify.completionListContains({ name: "foo", source: "/a" }, "import foo", "", "alias", /*spanIndex*/ undefined, /*hasAction*/ true, options);
verify.not.completionListContains({ name: "foo", source: "/a_reexport" }, undefined, undefined, undefined, undefined, undefined, options);
verify.not.completionListContains({ name: "foo", source: "/a_reexport_2" }, undefined, undefined, undefined, undefined, undefined, options);

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a".`,
    // TODO: GH#18445
    newFileContent: `import { foo } from "./a";\r
\r
fo`,
});

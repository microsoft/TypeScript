/// <reference path="fourslash.ts" />

// Tests that we don't filter out a completion for an alias,
// so long as it's not an alias to a different module.

// @module: esnext

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

verify.completions({
    marker: "",
    includes: { name: "foo", source: "/a", sourceDisplay: "./a", text: "(alias) const foo: 0\nexport foo", kind: "alias", hasAction: true },
    excludes: [{ name: "foo", source: "/a_reexport" }, { name: "foo", source: "/a_reexport_2" }],
    preferences: { includeCompletionsForModuleExports: true },
});

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a"`,
    newFileContent: `import { foo } from "./a";

fo`,
});

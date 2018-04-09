/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /global.d.ts
// A local variable would prevent import completions (see `completionsImport_shadowedByLocal.ts`), but a global doesn't.
////declare var foo: number;

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////export const foo = 1;

// @Filename: /c.ts
////fo/**/

goTo.marker("");
const options = { includeExternalModuleExports: true, sourceDisplay: undefined };
verify.completionListContains("foo", "var foo: number", "", "var", undefined, undefined, options);
verify.completionListContains({ name: "foo", source: "/a" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, { ...options, sourceDisplay: "./a" });
verify.completionListContains({ name: "foo", source: "/b" }, "const foo: 1", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, { ...options, sourceDisplay: "./b" });

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/b",
    description: `Import 'foo' from module "./b"`,
    newFileContent: `import { foo } from "./b";

fo`,
});

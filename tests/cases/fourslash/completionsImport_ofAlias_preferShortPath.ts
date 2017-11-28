/// <reference path="fourslash.ts" />

// Test that the completion is for the shortest path, even if that's a re-export.
// Note that `source` in completionEntries will still be the original exporting path, but we use the re-export in completionDetails.

// @moduleResolution: node
// @module: commonJs

// @Filename: /foo/index.ts
////export { foo } from "./lib/foo";

// @Filename: /foo/lib/foo.ts
////export const foo = 0;

// @Filename: /user.ts
////fo/**/

goTo.marker("");
const options = { includeExternalModuleExports: true, sourceDisplay: "./foo" };
verify.completionListContains({ name: "foo", source: "/foo/lib/foo" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, options);
verify.not.completionListContains({ name: "foo", source: "/foo/index" }, undefined, undefined, undefined, undefined, undefined, options);

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/foo/lib/foo",
    description: `Import 'foo' from module "./foo".`,
    // TODO: GH#18445
    newFileContent: `import { foo } from "./foo";\r
\r
fo`,
});

/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.d.ts
////declare namespace N {
////    export const foo = 0;
////}
////export = N;

// @Filename: /b.ts
////f/**/;

goTo.marker("");
verify.completionListContains({ name: "foo", source: "/a" }, "const N.foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a"`,
    newFileContent: `import { foo } from "./a";

f;`,
});

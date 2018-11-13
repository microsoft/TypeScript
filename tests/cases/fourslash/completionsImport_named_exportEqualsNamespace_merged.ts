/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /b.d.ts
////declare namespace N {
////    export const foo: number;
////}
////declare module "n" {
////    export = N;
////}

// @Filename: /c.d.ts
////declare namespace N {}

// @Filename: /a.ts
////fo/**/

verify.completions({
    marker: "",
    includes: {
        name: "foo",
        source: "n",
        sourceDisplay: "n",
        text: "const N.foo: number",
        kind: "const",
        kindModifiers: "export,declare",
        hasAction: true,
    },
    preferences: { includeCompletionsForModuleExports: true },
});

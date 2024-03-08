/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////let foo = 1, bar = 1;
////export const baz = 1;

// @filename: /b.ts
////import { bar } from "./a";

goTo.file("/b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Export_0_from_module_1.message, "bar", "./a"],
    index: 0,
    newFileContent: {
        "/a.ts":
`let foo = 1, bar = 1;
export const baz = 1;

export { bar };
`,
    }
});

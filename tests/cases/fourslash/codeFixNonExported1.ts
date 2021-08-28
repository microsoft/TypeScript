/// <reference path='fourslash.ts' />

// @Filename: f1.ts
////const foo = 1;

// @Filename: f2.ts
////import { [|foo|] } from "./f1";

goTo.file("f2.ts")
verify.codeFix({
    index: 1,
    description: [ts.Diagnostics.Export_1_from_module_0.message, "./f1", "foo"],
    newFileContent: {
        "a.ts": `export const foo = 1;`
    }
});

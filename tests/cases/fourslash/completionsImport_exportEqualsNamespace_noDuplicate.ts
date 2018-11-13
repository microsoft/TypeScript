/// <reference path='fourslash.ts'/>

// @Filename: /node_modules/a/index.d.ts
////declare namespace core {
////    const foo: number;
////}
////declare module "a" {
////    export = core;
////}
////declare module "a/alias" {
////    export = core;
////}

// @Filename: /user.ts
////import * as a from "a";
/////**/foo;

verify.completions({
    marker: "",
    // Tester will assert that it is only included once
    includes: [{ name: "foo", source: "a", hasAction: true }],
    preferences: {
        includeCompletionsForModuleExports: true,
    }
});

/// <reference path='fourslash.ts'/>

// @esModuleInterop: true
// @moduleResolution: node
// @target: es2015
// @module: esnext

// @Filename: /node_modules/@bar/foo/index.d.ts
//// export = Foo;
//// declare class Foo {}
//// declare namespace Foo {}  // class/namespace declaration causes the issue

// @Filename: /node_modules/foo/index.d.ts
//// import * as Foo from "@bar/foo";
//// export = Foo;

// @Filename: /index.ts
//// import Foo from "foo";
//// /**/

goTo.file("/index.ts");
verify.completions({
    marker: "",
    includes: ["Foo"],
    preferences: {
        includeCompletionsForModuleExports: true
    }
});
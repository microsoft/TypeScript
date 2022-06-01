/// <reference path="fourslash.ts" />

// @Filename: /index.ts
////import { Foo } from "foo";
////declare const f: Foo;
////f./**/bar;
// @Filename: /node_modules/foo/package.json
//// { "types": "index.d.ts" }
// @Filename: /node_modules/foo/index.d.ts
////export interface Foo {
////    bar: string;
////}

verify.baselineRename("", {});

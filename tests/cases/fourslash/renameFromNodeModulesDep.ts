/// <reference path="fourslash.ts" />

// @Filename: /index.ts
////import { /*ok*/[|Foo|] } from "foo";
////declare const f: Foo;
////f./*notOk*/bar;
// @Filename: /tsconfig.json
//// { }
// @Filename: /node_modules/foo/package.json
//// { "types": "index.d.ts" }
// @Filename: /node_modules/foo/index.d.ts
////export interface Foo {
////    bar: string;
////}

goTo.marker("ok");
verify.renameInfoSucceeded();
goTo.marker("notOk");
verify.renameInfoFailed();

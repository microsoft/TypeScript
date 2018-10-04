
///<reference path="fourslash.ts"/>

// @Filename: /node_modules/foo/index.d.ts
////export = Foo;
////interface Foo { bar: number; }
////declare namespace Foo {
////    interface Static {}
////}

// @Filename: /a.ts
////import { /**/ } from "foo";

verify.completionsAt("", ["Static"]);

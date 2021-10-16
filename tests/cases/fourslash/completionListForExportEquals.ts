
///<reference path="fourslash.ts"/>

// @Filename: /node_modules/foo/index.d.ts
////export = Foo;
////declare var Foo: Foo.Static;
////declare namespace Foo {
////    interface Static {
////        foo(): void;
////    }
////}

// @Filename: /a.ts
////import { /**/ } from "foo";

verify.completions({ marker: "", exact: ["Static", "foo", { name: "type", sortText: completion.SortText.GlobalsOrKeywords }] });

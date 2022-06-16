/// <reference path="fourslash.ts" />

// @Filename: /index.ts
////import { /*okWithAlias*/[|Foo|] } from "foo";
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

goTo.marker("okWithAlias");
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { providePrefixAndSuffixTextForRename: true });
verify.renameInfoFailed(
    undefined,
    { providePrefixAndSuffixTextForRename: false });
goTo.marker("notOk");
verify.renameInfoFailed("You cannot rename elements that are defined in a 'node_modules' folder.");

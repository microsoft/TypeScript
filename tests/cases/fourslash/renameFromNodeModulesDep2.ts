/// <reference path="fourslash.ts" />

// @Filename: /node_modules/first/index.d.ts
////import { /*okWithAlias*/[|Foo|] } from "foo";
////declare type FooBar = Foo[/*notOk*/"bar"];

// @Filename: /node_modules/first/node_modules/foo/package.json
//// { "types": "index.d.ts" }

// @Filename: /node_modules/first/node_modules/foo/index.d.ts
////export interface Foo {
////    /*ok2*/[|bar|]: string;
////}

// @Filename: /node_modules/first/node_modules/foo/bar.d.ts
////import { Foo } from "./index";
////declare type FooBar = Foo[/*ok3*/"[|bar|]"];

const [ okWithAliasRange, ok2Range, ok3Range ] = test.ranges();
goTo.marker("okWithAlias");
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    okWithAliasRange,
    { providePrefixAndSuffixTextForRename: true });
verify.renameInfoFailed(
    "You cannot rename elements that are defined in another 'node_modules' folder.",
    { providePrefixAndSuffixTextForRename: false });
goTo.marker("notOk");
verify.renameInfoFailed("You cannot rename elements that are defined in another 'node_modules' folder.");
goTo.marker("ok2");
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    ok2Range);
goTo.marker("ok3");
verify.renameInfoSucceeded(undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    ok3Range);

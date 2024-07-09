/// <reference path="fourslash.ts" />

// @Filename: /packages/first/index.d.ts
////import { /*ok*/[|Foo|] } from "foo";
////declare type FooBar = Foo[/*ok2*/"[|bar|]"];

// @Filename: /packages/foo/package.json
//// { "types": "index.d.ts" }

// @Filename: /packages/foo/index.d.ts
////export interface Foo {
////    /*ok3*/[|bar|]: string;
////}

// @link: /packages/foo -> /packages/first/node_modules/foo

const [ okRange, ok2Range, ok3Range ] = test.ranges();
goTo.marker("ok");
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    okRange,
    { providePrefixAndSuffixTextForRename: true });
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    okRange,
    { providePrefixAndSuffixTextForRename: false });
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
/// <reference path="fourslash.ts" />

// @Filename: /index.ts
////import hljs from "highlight.js/lib/core"
////import { h } from "highlight.js/lib/core";
////import { /*notOk*/h as hh } from "highlight.js/lib/core";
/////*ok*/[|hljs|];
/////*okWithAlias*/[|h|];
/////*ok2*/[|hh|];

// @Filename: /node_modules/highlight.js/lib/core.d.ts
////declare const hljs: { registerLanguage(s: string): void };
////export default hljs;
////export const h: string;

// @Filename: /tsconfig.json
////{}

const [ hljs, h, hh ] = test.ranges();
goTo.marker("ok");
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    hljs,
    { providePrefixAndSuffixTextForRename: true });
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    hljs,
    { providePrefixAndSuffixTextForRename: false });
goTo.marker("ok2");
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    hh,
    { providePrefixAndSuffixTextForRename: true });
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    hh,
    { providePrefixAndSuffixTextForRename: false });

goTo.marker("notOk");
verify.renameInfoFailed(
    "You cannot rename elements that are defined in a 'node_modules' folder.",
    { providePrefixAndSuffixTextForRename: true });
verify.renameInfoFailed(
    "You cannot rename elements that are defined in a 'node_modules' folder.",
    { providePrefixAndSuffixTextForRename: false });

goTo.marker("okWithAlias");
verify.renameInfoSucceeded(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    h,
    { providePrefixAndSuffixTextForRename: true });
verify.renameInfoFailed(
    "You cannot rename elements that are defined in a 'node_modules' folder.",
    { providePrefixAndSuffixTextForRename: false });

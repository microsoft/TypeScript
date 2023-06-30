/// <reference path="fourslash.ts" />

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoJsDocTags9.js
/////**
//// * @typedef {{ [x: string]: any, y: number }} Foo
//// */
////
/////**
//// * @type {(t: T) => number}
//// * @template {Foo} T Comment Text
//// */
////const /**/foo = t => t.y;

verify.baselineQuickInfo();

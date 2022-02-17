/// <reference path="fourslash.ts" />

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoJsDocTags8.js
/////**
//// * @typedef {{ [x: string]: any, y: number }} Foo
//// */
////
/////**
//// * @type {(t: T) => number}
//// * @template {Foo} T
//// */
////const /**/foo = t => t.y;

verify.baselineQuickInfo();

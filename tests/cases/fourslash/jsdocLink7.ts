/// <reference path='fourslash.ts' />

// @filename: /a.ts
////export function A() { };

// @Filename: /b.ts
/////**
//// * {@link import('./a').A}
//// */
////export function /**/f() { }

verify.baselineQuickInfo();

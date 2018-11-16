/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////*a*/export function f() {}/*b*/
////export default function g() {}

goTo.select("a", "b");
verify.refactorsAvailable([]);

/// <reference path="fourslash.ts" />

// @Filename: /a.ts
// Not included:
////export function abcde() {}
////export function dbf() {}
// Included:
////export function bdf() {}
////export function abcdef() {}
////export function BDF() {}

// @Filename: /b.ts
////bdf/**/

goTo.marker("");

verify.not.completionListContains("abcde");
verify.not.completionListContains("dbf");

verify.completionListContains("bdf", "function bdf(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);
verify.completionListContains("abcdef", "function abcdef(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);
verify.completionListContains("BDF", "function BDF(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);

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

verify.not.completionListContains({ name: "abcde", source: "/a" });
verify.not.completionListContains({ name: "dbf", source: "/a" });

verify.completionListContains({ name: "bdf", source: "/a" }, "function bdf(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);
verify.completionListContains({ name: "abcdef", source: "/a" }, "function abcdef(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);
verify.completionListContains({ name: "BDF", source: "/a" }, "function BDF(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);

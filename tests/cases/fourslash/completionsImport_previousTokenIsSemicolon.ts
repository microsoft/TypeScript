/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function foo() {}

// @Filename: /b.ts
////import * as a from 'a';
/////**/

goTo.marker("");
verify.completionListContains("foo", "function foo(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);

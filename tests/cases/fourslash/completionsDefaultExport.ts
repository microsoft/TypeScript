/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function f() {}

// @Filename: /b.ts
////import * as a from "./a";
////a./**/;

goTo.marker();
verify.completionListContains("default", "function f(): void");

/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function f() {}

// @Filename: /b.ts
////import * as a from "./a";
////a./**/;

verify.completions({ marker: "", exact: { name: "default", text: "function f(): void" } });

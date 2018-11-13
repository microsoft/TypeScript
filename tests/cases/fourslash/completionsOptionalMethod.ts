/// <reference path="fourslash.ts" />

// @strictNullChecks: true

////declare const x: { m?(): void };
////x./**/

verify.completions({ marker: "", exact: "m" });

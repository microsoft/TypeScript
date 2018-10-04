/// <reference path="fourslash.ts" />

// @strictNullChecks: true

////declare const x: { m?(): void };
////x./**/

verify.completionsAt("", ["m"]);

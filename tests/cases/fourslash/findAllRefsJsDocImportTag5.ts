/// <reference path="fourslash.ts" />

// @checkJs: true

// @Filename: /a.js
//// export default function /*0*/a() {}

// @Filename: /b.js
//// /** @import /*1*/a, * as ns from "./a" */

verify.baselineFindAllReferences("0", "1");

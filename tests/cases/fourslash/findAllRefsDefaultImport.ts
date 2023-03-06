/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function /*0*/a() {}

// @Filename: /b.ts
////import /*1*/a, * as ns from "./a";

verify.baselineFindAllReferences('0', '1')

/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function /*0*/foo(): void {}

// @Filename: /b.ts
////export * from "./a";

// @Filename: /c.ts
////import { /*1*/foo } from "./b";

verify.noErrors();
verify.baselineFindAllReferences('0', '1')

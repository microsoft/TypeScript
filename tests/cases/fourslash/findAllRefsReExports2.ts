/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function /*1*/foo(): void {}

// @Filename: /b.ts
////import { foo as oof } from "./a";

verify.noErrors();
verify.baselineFindAllReferences('1')

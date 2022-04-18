/// <reference path="../fourslash.ts" />

// @moduleResolution: node

// @Filename: /a.js
//// export const a = { /*end*/a: 'a' };

// @Filename: /a.d.ts
//// export declare const a: { a: string };

// @Filename: /b.ts
//// import { a } from './a';
//// a.[|a/*start*/|]

verify.goToSourceDefinition("start", "end");

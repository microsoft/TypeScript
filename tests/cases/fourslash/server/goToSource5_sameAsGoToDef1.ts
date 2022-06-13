/// <reference path="../fourslash.ts" />

// @Filename: /a.ts
//// export const /*end*/a = 'a';

// @Filename: /a.d.ts
//// export declare const a: string;

// @Filename: /a.js
//// export const a = 'a';

// @Filename: /b.ts
//// import { a } from './a';
//// [|a/*start*/|]

verify.goToDefinition("start", "end");
verify.goToSourceDefinition("start", "end");

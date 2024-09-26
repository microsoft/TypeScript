/// <reference path="../fourslash.ts" />

// @moduleResolution: node

// @Filename: /home/src/workspaces/project/a.js
//// export const a = { /*end*/a: 'a' };

// @Filename: /home/src/workspaces/project/a.d.ts
//// export declare const a: { a: string };

// @Filename: /home/src/workspaces/project/b.ts
//// import { a } from './a';
//// a.[|a/*start*/|]

verify.baselineGoToSourceDefinition("start");

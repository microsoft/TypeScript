/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.ts
//// export const /*end*/a = 'a';

// @Filename: /home/src/workspaces/project/a.d.ts
//// export declare const a: string;

// @Filename: /home/src/workspaces/project/a.js
//// export const a = 'a';

// @Filename: /home/src/workspaces/project/b.ts
//// import { a } from './a';
//// [|a/*start*/|]

verify.baselineGoToSourceDefinition("start");
verify.baselineGoToDefinition("start");

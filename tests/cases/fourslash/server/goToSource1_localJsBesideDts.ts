/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.js
//// export const /*end*/a = "a";

// @Filename: /home/src/workspaces/project/a.d.ts
//// export declare const a: string;

// @Filename: /home/src/workspaces/project/index.ts
//// import { a } from [|"./a"/*moduleSpecifier*/|];
//// [|a/*identifier*/|]

verify.baselineGoToSourceDefinition("identifier", "moduleSpecifier");
/// <reference path="../fourslash.ts" />

// @Filename: /a.js
//// export const /*end*/a = "a";

// @Filename: /a.d.ts
//// export declare const a: string;

// @Filename: /index.ts
//// import { a } from [|"./a"/*moduleSpecifier*/|];
//// [|a/*identifier*/|]

verify.goToSourceDefinition("identifier", "end");
verify.goToSourceDefinition("moduleSpecifier", { file: "/a.js" })
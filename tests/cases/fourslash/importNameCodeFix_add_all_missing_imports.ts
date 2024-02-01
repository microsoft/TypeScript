/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const a: number;
////export const k: number;
// @Filename: /b.ts
////export const b: number;

// @Filename: /c.ts
////export const c: number;

// @Filename: /d.ts
////export const k: number;

// @Filename: /main.ts
////a;
////k;
////b;
////c;

goTo.file("/main.ts");
verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent:
`import { a, k } from "./a";
import { b } from "./b";
import { c } from "./c";

a;
k;
b;
c;`,
});

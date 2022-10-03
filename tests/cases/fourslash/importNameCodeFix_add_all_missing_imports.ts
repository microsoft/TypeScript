/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const a: number;

// @Filename: /b.ts
////export const b: number;

// @Filename: /c.ts
////export const c: number;

// @Filename: /main.ts
////a;
////b;
////c;

goTo.file("/main.ts");
verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent:
`import { a } from "./a";
import { b } from "./b";
import { c } from "./c";

a;
b;
c;`,
});

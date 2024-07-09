/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////// leading trivia
////import { b } from "./b";
////import * as foo from "";
////import { c } from "./c";

// @Filename: /b.ts
////export const b = null;

// @Filename: /c.ts
////export const c = null;

verify.codeFix({
    index: 1,
    description: "Remove import from ''",
    newFileContent:
`// leading trivia
import { b } from "./b";
import { c } from "./c";`,
});

/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
////export default function /*fDef*/f() {}
////export const /*xDef*/x = 0;

// @Filename: /b.ts
/////*bDef*/declare const b: number;
////export = b;

// @Filename: /b.ts
////import f, { x } from "./a";
////import * as /*aDef*/a from "./a";
////import b = require("./b");
////[|/*fUse*/f|];
////[|/*xUse*/x|];
////[|/*aUse*/a|];
////[|/*bUse*/b|];

verify.baselineGoToDefinition(
    "aUse", // Namespace import isn't "skipped"
    "fUse",
    "xUse",
    "bUse",
);


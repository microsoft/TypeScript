/// <reference path='fourslash.ts' />

/////*a*/import * as m from "m";/*b*/
////declare const a: m.aa;
////declare const b: m.b;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert namespace import to named imports",
    actionDescription: "Convert namespace import to named imports",
    newContent:
`import { aa, b as b_1 } from "m";
declare const a: aa;
declare const b: b_1;`,
});

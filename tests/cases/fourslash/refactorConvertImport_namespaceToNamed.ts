/// <reference path='fourslash.ts' />

/////*a*/import * as m from "m";/*b*/
////const a = 0;
////m.a;
////m.b;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert namespace import to named imports",
    actionDescription: "Convert namespace import to named imports",
    newContent:
`import { a as a_1, b } from "m";
const a = 0;
a_1;
b;`,
});

/// <reference path='fourslash.ts' />

/////*a*/import * as m from "m";/*b*/
////m.a;
////m;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert namespace import to named imports",
    actionDescription: "Convert namespace import to named imports",
    newContent:
`import * as m from "m";
import { a } from "m";
a;
m;`,
});

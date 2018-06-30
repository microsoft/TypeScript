/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

/////*a*/import * as m from "m";/*b*/
////m();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert namespace import to named imports",
    actionDescription: "Convert namespace import to named imports",
    newContent:
`import m from "m";
m();`,
});

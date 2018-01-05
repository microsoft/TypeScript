/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

// @Filename: /a.d.ts
////declare const x: number;
////export = x;

// @Filename: /b.ts
/////*b0*/import * as a from "./a";/*b1*/

// @Filename: /c.ts
/////*c0*/import a = require("./a");/*c1*/

goTo.select("b0", "b1");
edit.applyRefactor({
    refactorName: "Convert to default import",
    actionName: "Convert to default import",
    actionDescription: "Convert to default import",
    newContent: 'import a from "./a";',
});

goTo.select("c0", "c1");
edit.applyRefactor({
    refactorName: "Convert to default import",
    actionName: "Convert to default import",
    actionDescription: "Convert to default import",
    newContent: 'import a from "./a";',
});

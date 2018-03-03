/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

// @Filename: /a.d.ts
////declare const x: number;
////export = x;

// @Filename: /b.ts
/////*b0*/import * as a from "./a";/*b1*/

// @Filename: /c.ts
/////*c0*/import a = require("./a");/*c1*/

// @Filename: /d.ts
/////*d0*/import "./a";/*d1*/

// @Filename: /e.ts
/////*e0*/import * as n from "./non-existant";/*e1*/

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

goTo.select("d0", "d1");
verify.not.applicableRefactorAvailableAtMarker("d0");

goTo.select("e0", "e1");
verify.not.applicableRefactorAvailableAtMarker("e0");
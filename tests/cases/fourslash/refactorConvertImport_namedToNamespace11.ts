/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @filename: /a.js
/////*a*/import { a } from "./foo.js";/*b*/
////a;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    newContent:
`import * as foo from "./foo.js";
foo.a;`,
});

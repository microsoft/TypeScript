/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @filename: /a.js
/////** [|@import { join } from "path"|] */

goTo.selectRange(test.ranges()[0]);
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    newContent: `/** @import * as path from "path" */`,
});

/// <reference path='fourslash.ts' />

/////*a*/import { x, y as z, T } from "m";/*b*/
////const m = 0;
////x;
////z;
////const n: T = 0;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    newContent:
`import * as _m from "m";
const m = 0;
_m.x;
_m.y;
const n: _m.T = 0;`,
});

/// <reference path='fourslash.ts' />

/////*a*/import { x, y as z, T } from "m";/*b*/
////const m = 0;
////const o = { x };
////export { x }; // Need a named import for this
////z;
////const n: T = 0;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    newContent:
// TODO: GH#23781 (_m.y shouldn't be indented)
`import * as _m from "m";
import { x } from "m";
const m = 0;
const o = { x: _m.x };
export { x }; // Need a named import for this
    _m.y;
const n: _m.T = 0;`,
});

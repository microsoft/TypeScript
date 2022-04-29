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
// TODO: GH#23781 (m_1.y shouldn't be indented)
`import * as m_1 from "m";
import { x } from "m";
const m = 0;
const o = { x: m_1.x };
export { x }; // Need a named import for this
    m_1.y;
const n: m_1.T = 0;`,
});

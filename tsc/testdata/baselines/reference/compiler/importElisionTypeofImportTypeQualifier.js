//// [tests/cases/compiler/importElisionTypeofImportTypeQualifier.ts] ////

//// [b.ts]
export namespace ns { export const y = 1; }

//// [c.ts]
export namespace ns { export const y = 2; }

//// [a.ts]
import { ns } from "./c";
export function f(x: typeof import("./b").ns.y) {}


//// [b.js]
export var ns;
(function (ns) {
    ns.y = 1;
})(ns || (ns = {}));
//// [c.js]
export var ns;
(function (ns) {
    ns.y = 2;
})(ns || (ns = {}));
//// [a.js]
export function f(x) { }

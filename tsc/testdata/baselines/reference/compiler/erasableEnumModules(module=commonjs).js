//// [tests/cases/compiler/erasableEnumModules.ts] ////

//// [enums.ts]
/** Public values. */
export const Before = 0, Color: enum = {
    Red: "red",
    Blue: "blue",
}, After = 1;
export const Numeric: enum = { One: 1, Shifted: 1 << 2 };
export { Color as Shade };
export enum Legacy { One = 1 }

// Declaration emit retains reachable local types and prototype configuration.
const Local: enum = { "__proto__": (null), A: 1, B: "b" };
export const alias = Local;
export function member() {
    return Local.A;
}
export namespace Values {
    export const E: enum = { A: 1, B: "b" };
    export const alias = E;
    export const member: E.A = E.A;
}
//// [consumer.ts]
import { Color, Numeric, Shade } from "./enums";
export const red: Color.Red = Color.Red;
export const shade: Shade = Color.Blue;
export const numeric: Numeric = Numeric.Shifted;
export function choose(color: Color): Color {
    return color;
}
//// [references.ts]
import { Legacy } from "./enums";
// Erased annotations preserve the import and runtime member accesses.
export const FromLegacy: enum = { Property: Legacy.One, Index: Legacy["One"] };
//// [folded.ts]
import { Legacy } from "./enums";
// Traditional enum constant folding can still remove its otherwise unused import.
export enum Folded { One = Legacy.One }


//// [enums.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Values = exports.alias = exports.Legacy = exports.Shade = exports.Numeric = exports.After = exports.Color = exports.Before = void 0;
exports.member = member;
/** Public values. */
exports.Before = 0, exports.Color = {
    Red: "red",
    Blue: "blue",
}, exports.After = 1;
exports.Shade = exports.Color;
exports.Numeric = { One: 1, Shifted: 1 << 2 };
var Legacy;
(function (Legacy) {
    Legacy[Legacy["One"] = 1] = "One";
})(Legacy || (exports.Legacy = Legacy = {}));
// Declaration emit retains reachable local types and prototype configuration.
const Local = { "__proto__": (null), A: 1, B: "b" };
exports.alias = Local;
function member() {
    return Local.A;
}
var Values;
(function (Values) {
    Values.E = { A: 1, B: "b" };
    Values.alias = Values.E;
    Values.member = Values.E.A;
})(Values || (exports.Values = Values = {}));
//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeric = exports.shade = exports.red = void 0;
exports.choose = choose;
const enums_1 = require("./enums");
exports.red = enums_1.Color.Red;
exports.shade = enums_1.Color.Blue;
exports.numeric = enums_1.Numeric.Shifted;
function choose(color) {
    return color;
}
//// [references.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FromLegacy = void 0;
const enums_1 = require("./enums");
// Erased annotations preserve the import and runtime member accesses.
exports.FromLegacy = { Property: enums_1.Legacy.One, Index: enums_1.Legacy["One"] };
//// [folded.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folded = void 0;
// Traditional enum constant folding can still remove its otherwise unused import.
var Folded;
(function (Folded) {
    Folded[Folded["One"] = 1] = "One";
})(Folded || (exports.Folded = Folded = {}));


//// [enums.d.ts]
/** Public values. */
export declare const Before = 0, Color: enum = {
    Red: "red",
    Blue: "blue"
}, After = 1;
export declare const Numeric: enum = { One: 1, Shifted: 4 };
export { Color as Shade };
export declare enum Legacy {
    One = 1
}
declare const Local: enum = { "__proto__": (null), A: 1, B: "b" };
export declare const alias: typeof Local;
export declare function member(): Local;
export declare namespace Values {
    const E: enum = { A: 1, B: "b" };
    const alias: typeof E;
    const member: E.A;
}
//// [consumer.d.ts]
import { Color, Numeric, Shade } from "./enums";
export declare const red: Color.Red;
export declare const shade: Shade;
export declare const numeric: Numeric;
export declare function choose(color: Color): Color;
//// [references.d.ts]
export declare const FromLegacy: enum = { Property: 1, Index: 1 };
//// [folded.d.ts]
export declare enum Folded {
    One = 1
}

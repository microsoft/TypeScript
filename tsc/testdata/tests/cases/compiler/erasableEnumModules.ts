// @strict: true
// @target: esnext
// @module: commonjs, esnext
// @declaration: true
// @filename: enums.ts
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
// @filename: consumer.ts
import { Color, Numeric, Shade } from "./enums";
export const red: Color.Red = Color.Red as const;
export const shade: Shade = Color["Blue"] as const;
export const numeric: Numeric = Numeric.Shifted;
export function choose(color: Color): Color {
    return color;
}
// @filename: references.ts
import { Legacy } from "./enums";
// Erased annotations preserve the import and runtime member accesses.
export const FromLegacy: enum = { Property: Legacy.One, Index: Legacy["One"] };
// @filename: folded.ts
import { Legacy } from "./enums";
// Traditional enum constant folding can still remove its otherwise unused import.
export enum Folded { One = Legacy.One }

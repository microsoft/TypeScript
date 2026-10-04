//// [tests/cases/compiler/typedefHoisting.ts] ////

//// [x.js]
class C {
    /** @import {Bar} from "./y" */
    /** @typedef {Bar[]} Bars */
    /** @type {Bars} */
    foo = ["abc", "def"]
    bar(/** @type {Bar} */ x) {
        return x
    }
}

//// [y.js]
/** @typedef {string} Bar */
export {}




//// [y.d.ts]
export type Bar = string;
/** @typedef {string} Bar */
export {};
//// [x.d.ts]
import type { Bar } from "./y";
type Bars = Bar[];
declare class C {
    /** @import {Bar} from "./y" */
    /** @typedef {Bar[]} Bars */
    /** @type {Bars} */
    foo: Bars;
    bar(/** @type {Bar} */ x: Bar): string;
}

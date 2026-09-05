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
/** @typedef {string} Bar */
export type Bar = string;
export {};
//// [x.d.ts]
import type { Bar } from "./y";
/** @typedef {Bar[]} Bars */
type Bars = Bar[];
declare class C {
    /** @import {Bar} from "./y" */
    /** @type {Bars} */
    foo: Bars;
    bar(/** @type {Bar} */ x: Bar): string;
}

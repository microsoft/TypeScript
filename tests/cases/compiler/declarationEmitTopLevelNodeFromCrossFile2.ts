// @strict: true
// @declaration: true

// @filename: a.ts
import { boxedBox } from "./boxedBox";

export const _ = boxedBox;

// At index 83
/**
 * wat
 */

// @filename: boxedBox.d.ts
export declare const boxedBox: import("./box").Box<{
    boxed: import("./box").Box<number>;
}>;                        // ^This is index 83 in this file

// @filename: box.d.ts
export declare class Box<T> {
    value: T;
    constructor(value: T);
}
export declare function box<T>(value: T): Box<T>;
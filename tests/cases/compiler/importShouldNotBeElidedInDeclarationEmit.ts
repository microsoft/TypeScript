// @declaration: true
// @filename: node_modules/umd.d.ts
export as namespace UMD;

export type Thing = {
    a: number;
}

export declare function makeThing(): Thing;
// @filename: index.ts
import { makeThing } from "umd";
export const thing = makeThing();

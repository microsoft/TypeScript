// @declaration: true
// @filename: whole.d.ts
declare namespace thing {
    export const a = 1;
    export interface A {}
    export function getNs(): typeof thing;
}
export = thing;
// @filename: types.d.ts
export interface A {}
export interface B {}
export interface C {}

export declare function getA(): A;
export declare function getB(): B;
export declare function getC(): C;
// @filename: index.ts

import { getA } from "./types";
import { getNs } from "./whole";

export const a1 = getA();
export const a2 = [getA()];
export const a3 = { a: getA() };

export const ns1 = getNs();
export const ns2 = [getNs()];
export const ns3 = { a: getNs() };

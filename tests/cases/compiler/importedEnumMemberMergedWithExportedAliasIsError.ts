// @filename: enum.ts
export enum Enum {
    A,
    B
}
// @filename: alias.ts
import {Enum} from "./enum";

import EnumA = Enum.A;

export type EnumA = [string] | [string, number];

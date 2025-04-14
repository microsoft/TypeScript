// @filename: a.ts
export const n = 1;
export const s = "s";
export enum E1 { A = "ENUM_KEY" }
export enum E2 { B }

// @filename: b.ts
import * as keys from "./a";

const t1 = {
    [keys.n]: 1,
    [keys.n]: 1, // duplicate
}

const t2 = {
    [keys.s]: 1,
    [keys.s]: 1, // duplicate
}

const t3 = {
    [keys.E1.A]: 1,
    [keys.E1.A]: 1, // duplicate
}

const t4 = {
    [keys.E2.B]: 1,
    [keys.E2.B]: 1, // duplicate
}

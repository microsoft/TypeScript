//// [tests/cases/compiler/duplicateObjectLiteralProperty_computedName3.ts] ////

//// [a.ts]
export const n = 1;
export const s = "s";
export enum E1 { A = "ENUM_KEY" }
export enum E2 { B }

//// [b.ts]
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


//// [a.js]
export const n = 1;
export const s = "s";
export { E1 };
var E1;
(function (E1) {
    E1["A"] = "ENUM_KEY";
})(E1 || (E1 = {}));
export { E2 };
var E2;
(function (E2) {
    E2[E2["B"] = 0] = "B";
})(E2 || (E2 = {}));
//// [b.js]
import * as keys from "./a";
const t1 = {
    [keys.n]: 1,
    [keys.n]: 1, // duplicate
};
const t2 = {
    [keys.s]: 1,
    [keys.s]: 1, // duplicate
};
const t3 = {
    [keys.E1.A]: 1,
    [keys.E1.A]: 1, // duplicate
};
const t4 = {
    [keys.E2.B]: 1,
    [keys.E2.B]: 1, // duplicate
};

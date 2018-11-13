// @target: esnext
// @lib: esnext
// @module: commonjs
// @declaration: true
// @filename: module.ts
export const c0 = "a";
export const c1 = 1;
export const s0 = Symbol();
export interface T0 {
    [c0]: number;
    [c1]: string;
    [s0]: boolean;
}
export declare class T1 implements T2 {
    [c0]: number;
    [c1]: string;
    [s0]: boolean;
}
export declare class T2 extends T1 {
}
export declare type T3 = {
    [c0]: number;
    [c1]: string;
    [s0]: boolean;
};

// @filename: main.ts
import { c0, c1, s0, T0, T1, T2, T3 } from "./module";
import * as M from "./module";

namespace N {
    export const c2 = "a";
    export const c3 = 1;
    export const s1: typeof s0 = s0;

    export interface T4 {
        [N.c2]: number;
        [N.c3]: string;
        [N.s1]: boolean;
    }
    export declare class T5 implements T4 {
        [N.c2]: number;
        [N.c3]: string;
        [N.s1]: boolean;
    }
    export declare class T6 extends T5 {
    }
    export declare type T7 = {
        [N.c2]: number;
        [N.c3]: string;
        [N.s1]: boolean;
    };
}

export const c4 = "a";
export const c5 = 1;
export const s2: typeof s0 = s0;

interface T8 {
    [c4]: number;
    [c5]: string;
    [s2]: boolean;
}
declare class T9 implements T8 {
    [c4]: number;
    [c5]: string;
    [s2]: boolean;
}
declare class T10 extends T9 {
}
declare type T11 = {
    [c4]: number;
    [c5]: string;
    [s2]: boolean;
};

interface T12 {
    a: number;
    1: string;
    [s2]: boolean;
}
declare class T13 implements T2 {
    a: number;
    1: string;
    [s2]: boolean;
}
declare class T14 extends T13 {
}
declare type T15 = {
    a: number;
    1: string;
    [s2]: boolean;
};

declare class C {
    static a: number;
    static 1: string;
    static [s2]: boolean;
}

let t0: T0;
let t1: T1;
let t2: T2;
let t3: T3;
let t0_1: M.T0;
let t1_1: M.T1;
let t2_1: M.T2;
let t3_1: M.T3;
let t4: N.T4;
let t5: N.T5;
let t6: N.T6;
let t7: N.T7;
let t8: T8;
let t9: T9;
let t10: T10;
let t11: T11;
let t12: T12;
let t13: T13;
let t14: T14;
let t15: T15;

// assignability
t0 = t1, t0 = t2, t0 = t3, t1 = t0, t1 = t2, t1 = t3, t2 = t0, t2 = t1, t2 = t3, t3 = t0, t3 = t1, t3 = t2;
t4 = t5, t4 = t6, t4 = t7, t5 = t4, t5 = t6, t5 = t7, t6 = t4, t6 = t5, t6 = t7, t7 = t4, t7 = t5, t7 = t6;
t0 = t12, t0 = t13, t0 = t14, t0 = t15, t12 = t0, t13 = t0, t14 = t0, t15 = t0;
t0 = C; // static side

// object literals
export const o1 = {
    [c4]: 1,
    [c5]: "a",
    [s2]: true
};

// check element access types
export const o1_c4 = o1[c4];
export const o1_c5 = o1[c5];
export const o1_s2 = o1[s2];

export const o2: T0 = o1;

// recursive declarations
// (type parameter indirection courtesy of #20400)
declare const rI: RI<"a">;
rI.x
interface RI<T extends "a" | "b"> {
    x: T;
    [rI.x]: "b";
}

declare const rC: RC<"a">;
rC.x
declare class RC<T extends "a" | "b"> {
    x: T;
    [rC.x]: "b";
}

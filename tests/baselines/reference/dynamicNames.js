//// [tests/cases/compiler/dynamicNames.ts] ////

//// [module.ts]
export const c0 = "a";
export const c1 = 1;
export interface T0 {
    [c0]: number;
    [c1]: string;
}
export declare class T1 implements T2 {
    [c0]: number;
    [c1]: string;
}
export declare class T2 extends T1 {
}
export declare type T3 = {
    [c0]: number;
    [c1]: string;
};

//// [main.ts]
import { c0, c1, T0, T1, T2, T3 } from "./module";
import * as M from "./module";

namespace N {
    export const c2 = "a";
    export const c3 = 1;

    export interface T4 {
        [N.c2]: number;
        [N.c3]: string;
    }
    export declare class T5 implements T4 {
        [N.c2]: number;
        [N.c3]: string;
    }
    export declare class T6 extends T5 {
    }
    export declare type T7 = {
        [N.c2]: number;
        [N.c3]: string;
    };
}

const c4 = "a";
const c5 = 1;

interface T8 {
    [c4]: number;
    [c5]: string;
}
declare class T9 implements T8 {
    [c4]: number;
    [c5]: string;
}
declare class T10 extends T9 {
}
declare type T11 = {
    [c4]: number;
    [c5]: string;
};

interface T12 {
    a: number;
    1: string;
}
declare class T13 implements T2 {
    a: number;
    1: string;
}
declare class T14 extends T13 {
}
declare type T15 = {
    a: number;
    1: string;
};

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

//// [module.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c0 = "a";
exports.c1 = 1;
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var N;
(function (N) {
    N.c2 = "a";
    N.c3 = 1;
})(N || (N = {}));
const c4 = "a";
const c5 = 1;
let t0;
let t1;
let t2;
let t3;
let t0_1;
let t1_1;
let t2_1;
let t3_1;
let t4;
let t5;
let t6;
let t7;
let t8;
let t9;
let t10;
let t11;
let t12;
let t13;
let t14;
let t15;
// assignability
t0 = t1, t0 = t2, t0 = t3, t1 = t0, t1 = t2, t1 = t3, t2 = t0, t2 = t1, t2 = t3, t3 = t0, t3 = t1, t3 = t2;
t4 = t5, t4 = t6, t4 = t7, t5 = t4, t5 = t6, t5 = t7, t6 = t4, t6 = t5, t6 = t7, t7 = t4, t7 = t5, t7 = t6;
t0 = t12, t0 = t13, t0 = t14, t0 = t15, t12 = t0, t13 = t0, t14 = t0, t15 = t0;


//// [module.d.ts]
export declare const c0 = "a";
export declare const c1 = 1;
export interface T0 {
    [c0]: number;
    [c1]: string;
}
export declare class T1 implements T2 {
    [c0]: number;
    [c1]: string;
}
export declare class T2 extends T1 {
}
export declare type T3 = {
    [c0]: number;
    [c1]: string;
};
//// [main.d.ts]

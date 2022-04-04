//// [genericRestParameters2.ts]
declare const t1: [number, string, ...boolean[]];
declare const t2: [string, ...boolean[]];
declare const t3: [...boolean[]];
declare const t4: [];

declare let f00: (...x: [number, string, boolean]) => void;
declare let f01: (a: number, ...x: [string, boolean]) => void;
declare let f02: (a: number, b: string, ...x: [boolean]) => void;
declare let f03: (a: number, b: string, c: boolean) => void;
declare let f04: (a: number, b: string, c: boolean, ...x: []) => void;

declare let f10: (...x: [number, string, ...boolean[]]) => void;
declare let f11: (a: number, ...x: [string, ...boolean[]]) => void;
declare let f12: (a: number, b: string, ...x: [...boolean[]]) => void;
declare let f13: (a: number, b: string, ...c: boolean[]) => void;

declare const ns: [number, string];
declare const sn: [string, number];

f10(42, "hello");
f10(42, "hello", true);
f10(42, "hello", true, false);
f10(t1[0], t1[1], t1[2], t1[3]);
f10(...t1);
f10(42, ...t2);
f10(42, "hello", ...t3);
f10(42, "hello", true, ...t4);
f10(42, "hello", true, ...t4, false, ...t3);

f11(42, "hello");
f11(42, "hello", true);
f11(42, "hello", true, false);
f11(t1[0], t1[1], t1[2], t1[3]);
f11(...t1);
f11(42, ...t2);
f11(42, "hello", ...t3);
f11(42, "hello", true, ...t4);
f11(42, "hello", true, ...t4, false, ...t3);

f12(42, "hello");
f12(42, "hello", true);
f12(42, "hello", true, false);
f12(t1[0], t1[1], t1[2], t1[3]);
f12(...t1);
f12(42, ...t2);
f12(42, "hello", ...t3);
f12(42, "hello", true, ...t4);
f12(42, "hello", true, ...t4, false, ...t3);

f13(42, "hello");
f13(42, "hello", true);
f13(42, "hello", true, false);
f13(t1[0], t1[1], t1[2], t1[3]);
f13(...t1);
f13(42, ...t2);
f13(42, "hello", ...t3);
f13(42, "hello", true, ...t4);
f13(42, "hello", true, ...t4, false, ...t3);

declare const f20: <T extends unknown[]>(...args: T) => T;

f20(...t1);
f20(42, ...t2);
f20(42, "hello", ...t3);
f20(42, "hello", ...t2, true);

type T01 = Parameters<(x: number, y: string, ...z: boolean[]) => void>;
type T02 = Parameters<(...args: [number, string, ...boolean[]]) => void>;
type T03 = ConstructorParameters<new (x: number, y: string, ...z: boolean[]) => void>;
type T04 = ConstructorParameters<new (...args: [number, string, ...boolean[]]) => void>;
type T05<T extends any[]> = Parameters<(x: string, ...args: T) => void>;
type T06 = T05<[number, ...boolean[]]>;

type P1<T extends Function> = T extends (head: infer A, ...tail: infer B) => any ? { head: A, tail: B } : any[];

type T10 = P1<(x: number, y: string, ...z: boolean[]) => void>;
type T11 = P1<(...z: number[]) => void>;
type T12 = P1<(x: number, y: number) => void>;


//// [genericRestParameters2.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
f10(42, "hello");
f10(42, "hello", true);
f10(42, "hello", true, false);
f10(t1[0], t1[1], t1[2], t1[3]);
f10.apply(void 0, t1);
f10.apply(void 0, __spreadArray([42], t2, false));
f10.apply(void 0, __spreadArray([42, "hello"], t3, false));
f10.apply(void 0, __spreadArray([42, "hello", true], t4, false));
f10.apply(void 0, __spreadArray(__spreadArray(__spreadArray([42, "hello", true], t4, false), [false], false), t3, false));
f11(42, "hello");
f11(42, "hello", true);
f11(42, "hello", true, false);
f11(t1[0], t1[1], t1[2], t1[3]);
f11.apply(void 0, t1);
f11.apply(void 0, __spreadArray([42], t2, false));
f11.apply(void 0, __spreadArray([42, "hello"], t3, false));
f11.apply(void 0, __spreadArray([42, "hello", true], t4, false));
f11.apply(void 0, __spreadArray(__spreadArray(__spreadArray([42, "hello", true], t4, false), [false], false), t3, false));
f12(42, "hello");
f12(42, "hello", true);
f12(42, "hello", true, false);
f12(t1[0], t1[1], t1[2], t1[3]);
f12.apply(void 0, t1);
f12.apply(void 0, __spreadArray([42], t2, false));
f12.apply(void 0, __spreadArray([42, "hello"], t3, false));
f12.apply(void 0, __spreadArray([42, "hello", true], t4, false));
f12.apply(void 0, __spreadArray(__spreadArray(__spreadArray([42, "hello", true], t4, false), [false], false), t3, false));
f13(42, "hello");
f13(42, "hello", true);
f13(42, "hello", true, false);
f13(t1[0], t1[1], t1[2], t1[3]);
f13.apply(void 0, t1);
f13.apply(void 0, __spreadArray([42], t2, false));
f13.apply(void 0, __spreadArray([42, "hello"], t3, false));
f13.apply(void 0, __spreadArray([42, "hello", true], t4, false));
f13.apply(void 0, __spreadArray(__spreadArray(__spreadArray([42, "hello", true], t4, false), [false], false), t3, false));
f20.apply(void 0, t1);
f20.apply(void 0, __spreadArray([42], t2, false));
f20.apply(void 0, __spreadArray([42, "hello"], t3, false));
f20.apply(void 0, __spreadArray(__spreadArray([42, "hello"], t2, false), [true], false));


//// [genericRestParameters2.d.ts]
declare const t1: [number, string, ...boolean[]];
declare const t2: [string, ...boolean[]];
declare const t3: [...boolean[]];
declare const t4: [];
declare let f00: (...x: [number, string, boolean]) => void;
declare let f01: (a: number, ...x: [string, boolean]) => void;
declare let f02: (a: number, b: string, ...x: [boolean]) => void;
declare let f03: (a: number, b: string, c: boolean) => void;
declare let f04: (a: number, b: string, c: boolean, ...x: []) => void;
declare let f10: (...x: [number, string, ...boolean[]]) => void;
declare let f11: (a: number, ...x: [string, ...boolean[]]) => void;
declare let f12: (a: number, b: string, ...x: [...boolean[]]) => void;
declare let f13: (a: number, b: string, ...c: boolean[]) => void;
declare const ns: [number, string];
declare const sn: [string, number];
declare const f20: <T extends unknown[]>(...args: T) => T;
declare type T01 = Parameters<(x: number, y: string, ...z: boolean[]) => void>;
declare type T02 = Parameters<(...args: [number, string, ...boolean[]]) => void>;
declare type T03 = ConstructorParameters<new (x: number, y: string, ...z: boolean[]) => void>;
declare type T04 = ConstructorParameters<new (...args: [number, string, ...boolean[]]) => void>;
declare type T05<T extends any[]> = Parameters<(x: string, ...args: T) => void>;
declare type T06 = T05<[number, ...boolean[]]>;
declare type P1<T extends Function> = T extends (head: infer A, ...tail: infer B) => any ? {
    head: A;
    tail: B;
} : any[];
declare type T10 = P1<(x: number, y: string, ...z: boolean[]) => void>;
declare type T11 = P1<(...z: number[]) => void>;
declare type T12 = P1<(x: number, y: number) => void>;

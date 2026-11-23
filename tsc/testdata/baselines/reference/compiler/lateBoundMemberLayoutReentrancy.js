//// [tests/cases/compiler/lateBoundMemberLayoutReentrancy.ts] ////

//// [lateBoundMemberLayoutReentrancy.ts]
declare const rI: RI<"a">;
rI.x
interface RI<T extends "a" | "b"> {
    x: T;
    [rI.x]: "b";
}
declare const rI2: RI<"b">;
export const v1 = rI2.a;
export const v2 = rI.a;
export type K2 = keyof RI<"b">;
export const k: K2 = "a";
export const o: RI<"b"> = { x: "b", a: "b" };

declare const rC: RC<"a">;
rC.x
declare class RC<T extends "a" | "b"> {
    x: T;
    [rC.x]: "b";
}
declare const rC2: RC<"b">;
export const w1 = rC2.a;
export const w2 = rC.a;


//// [lateBoundMemberLayoutReentrancy.js]
rI.x;
export const v1 = rI2.a;
export const v2 = rI.a;
export const k = "a";
export const o = { x: "b", a: "b" };
rC.x;
export const w1 = rC2.a;
export const w2 = rC.a;


//// [lateBoundMemberLayoutReentrancy.d.ts]
declare const rI: RI<"a">;
interface RI<T extends "a" | "b"> {
    x: T;
    [rI.x]: "b";
}
export declare const v1: "b";
export declare const v2: "b";
export type K2 = keyof RI<"b">;
export declare const k: K2;
export declare const o: RI<"b">;
export declare const w1: "b";
export declare const w2: "b";
export {};

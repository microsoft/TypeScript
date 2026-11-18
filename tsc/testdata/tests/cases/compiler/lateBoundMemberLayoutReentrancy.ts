// @target: esnext
// @strict: true
// @declaration: true

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

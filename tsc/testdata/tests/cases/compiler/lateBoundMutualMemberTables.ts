// @target: esnext
// @strict: true
// @declaration: true

declare const a: A<"a">;
declare const b: B<"b">;
declare class A<T> {
    x: T;
    [b.y]: "fromB";
    [b.by]: "fromB2";
}
declare class B<T> {
    y: T;
    [a.x]: "fromA";
    [a.b]: "fromA2";
}
export const v1 = a.b;
export const v2 = b.a;
export const v3 = a.fromA2;
export const v4 = b.fromB;

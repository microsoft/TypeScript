//// [tests/cases/compiler/lateBoundMutualMemberTables.ts] ////

//// [lateBoundMutualMemberTables.ts]
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


//// [lateBoundMutualMemberTables.js]
export const v1 = a.b;
export const v2 = b.a;
export const v3 = a.fromA2;
export const v4 = b.fromB;


//// [lateBoundMutualMemberTables.d.ts]
export declare const v1: "fromB";
export declare const v2: "fromA";
export declare const v3: any;
export declare const v4: "fromA2";

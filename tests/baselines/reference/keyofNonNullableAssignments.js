//// [keyofNonNullableAssignments.ts]
type MyNonNullable<T> = T extends null ? never : T extends undefined ? never : T;

function f<T>(x: T) {
    const a: keyof T = (null as any as keyof NonNullable<T>);
    const b: keyof T = (null as any as keyof NonNullable<T & object>);
    const c: keyof T = (null as any as keyof MyNonNullable<T>);
    const d: keyof T = (null as any as keyof MyNonNullable<T & object>);
    const e: keyof T = (null as any as keyof NonNullable<T | undefined>);
    const f: keyof T = (null as any as keyof NonNullable<(T | undefined) & object>);
    const g: keyof T = (null as any as keyof MyNonNullable<T | undefined>);
    const h: keyof T = (null as any as keyof MyNonNullable<(T | undefined) & object>);
}


//// [keyofNonNullableAssignments.js]
"use strict";
function f(x) {
    var a = null;
    var b = null;
    var c = null;
    var d = null;
    var e = null;
    var f = null;
    var g = null;
    var h = null;
}

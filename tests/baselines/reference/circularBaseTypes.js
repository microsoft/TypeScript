//// [tests/cases/compiler/circularBaseTypes.ts] ////

//// [circularBaseTypes.ts]
// Repro from #38098

type M<T> = { value: T };
interface M2 extends M<M3> {};  // Error
type M3 = M2[keyof M2];  // Error

function f(m: M3) {
  return m.value;
}

// Repro from #32581

type X<T> = { [K in keyof T]: string } & { b: string };
interface Y extends X<Y> {
  a: "";
}


//// [circularBaseTypes.js]
"use strict";
// Repro from #38098
; // Error
function f(m) {
    return m.value;
}


//// [circularBaseTypes.d.ts]
type M<T> = {
    value: T;
};
interface M2 extends M<M3> {
}
type M3 = M2[keyof M2];
declare function f(m: M3): any;
type X<T> = {
    [K in keyof T]: string;
} & {
    b: string;
};
interface Y extends X<Y> {
    a: "";
}

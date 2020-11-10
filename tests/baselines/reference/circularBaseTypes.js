//// [circularBaseTypes.ts]
// Repro from #38098

type M<T> = { value: T };
interface M2 extends M<M3> {};  // Error
type M3 = M2[keyof M2];  // Error

function f(m: M3) {
  return m.value;
}


//// [circularBaseTypes.js]
"use strict";
// Repro from #38098
; // Error
function f(m) {
    return m.value;
}


//// [circularBaseTypes.d.ts]
declare type M<T> = {
    value: T;
};
interface M2 extends M<M3> {
}
declare type M3 = M2[keyof M2];
declare function f(m: M3): any;

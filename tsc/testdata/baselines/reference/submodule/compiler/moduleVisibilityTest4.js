//// [tests/cases/compiler/moduleVisibilityTest4.ts] ////

//// [moduleVisibilityTest4.ts]
module M {
    export type nums = number;
}

namespace N {
    export type nums = number;
}

let a1: M.num;
let b1: M.nums;
let c1: M.bar;

let a2: N.num;
let b2: N.nums;
let c2: N.bar;


//// [moduleVisibilityTest4.js]
let a1;
let b1;
let c1;
let a2;
let b2;
let c2;

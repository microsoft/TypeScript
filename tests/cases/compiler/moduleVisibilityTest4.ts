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

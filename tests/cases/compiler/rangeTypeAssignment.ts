let a1: (> 0) = 1;
let a2: number = a1;
let a3: (> -1) = a1;
let a4: (>= 0) = a1;
let a5: (> 0) = a1;

let b1: number = 0;
let b2: (< 0) = b1;
let b3: (> 0) = b1;

enum C {
    foo,
    bar
}

let c1: C = C.foo;
let c2: (>= 0) = C.foo;

let c3: C = c2;

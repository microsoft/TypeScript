let a1: (> -1) = 0;
let a2: (< 1) = -10;
let a4: (> 0.1) = 0.5;
let a5: (<= 4.5) = Math.E;
let a6: (>= -4) = 1.5;
let a7: (>= 2) = 2;

let b1: (> 1.2) = 1.2;
let b2: (< 1.2) = 1.2;
let b3: (>= 0) = -1;
let b4: (< 0) = 42;

enum C {
    foo,
    bar
}

let c1: (>= 0) = C.foo;
let c2: C = <C>c1;

const enum D {
    foo,
    bar
}

let d1: (>= 0) = D.foo;
let d2: (<= 0) = D.foo;

let d3: (<= 0) = D.bar;

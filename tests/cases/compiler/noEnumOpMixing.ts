enum A { x, y, z }
enum B { d, e, f }

// Should error
let m = A.x | B.d;
// Should OK
let n = A.x | A.y;
// Should OK
declare let a1: A, a2: A;
let o = a1 | a2;
// Should error
declare let b1: B;
let p = a1 | b1;

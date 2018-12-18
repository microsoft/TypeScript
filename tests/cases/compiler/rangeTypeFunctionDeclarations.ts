declare function a(arg: (> 0)): void;
let a1 = 1;
a(a1);
let a2: (> 1) = 2;
a(a2);

let a3 = 0;
a(a3);
let a4: (>= 0) = 0;
a(a4);


declare function b(): (< 1);
let b1: (< 1) = b();
let b2: (<= 1) = b();
let b3: (< 2) = b();

let b4: (< 0) = b();

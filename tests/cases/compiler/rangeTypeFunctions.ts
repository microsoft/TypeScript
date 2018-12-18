function a(): (> 1) {
    return 3;
}
let a0 = a();
let a1: number = a();
let a2: (> 1) = a();
let a3: (>= 1) = a();
let a4: (> 0) = a();

let a5: (> 2) = a();
let a6: (< 4) = a();


function b(): (>= 0) {
    return 0;
}
let b0 = b();
let b1: number = b();
let b2: (>= 0) = b();

let b3: (> 0) = b();
let b4: (>= 1) = b();


function c(): (> 0) {
    return 0;
}


function d(arg: (> 0)): void {
    arg;
    return;
}
let d1 = d(1);

let d2 = d(0);


function e(arg: (> 0)): (> 0) {
    return arg;
}
let e1 = e(1);

let e2 = e(0);

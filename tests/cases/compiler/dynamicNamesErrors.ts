// @target: esnext

const c0 = "1";
const c1 = 1;

interface T0 {
    [c0]: number;
    1: number;
}

interface T1 {
    [c0]: number;
}

interface T2 {
    [c0]: string;
}

let t1: T1;
let t2: T2;
t1 = t2;
t2 = t1;
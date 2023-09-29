function t1(a: number, b: number, c: number) {
    (throw a ? b : c);
}

function t2(a: number, b: number) {
    (throw a, b);
}

function t3(a: number, b: number) {
    (throw a && b);
}

function t4(a: number, b: number) {
    (throw a || b);
}

function t5(a: number, b: number, c: number) {
    (throw (a ? b : c));
}

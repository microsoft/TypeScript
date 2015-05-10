
var val1 = 1;
const val2 = 2;

declare enum test {
    a = 10,
    b = a,
    c = 10 << 2 * 8,
    d = 1.4,
    e = Math.PI,
    f,
    g = val1,
    h = val2,
}

test.a;
test.f;

const enum test2 {
    a = 10,
    b = a,
    c = 10 << 2 * 8,
    d = 1.4,
    e = Math.PI,
    f,
    g = val1,
    h = val2,
}

test2.a;
test2.f;
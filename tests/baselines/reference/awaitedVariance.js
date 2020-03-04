//// [awaitedVariance.ts]
declare let p0: Promise<number>;
declare let p1: Promise<Promise<number>>;
declare let p2: Promise<awaited number>;
p0 = p1;
p0 = p2;
p1 = p0;
p1 = p2;
p2 = p0;
p2 = p1;

function f1<T>(p0: Promise<T>, p1: Promise<Promise<T>>, p2: Promise<awaited T>) {
    p0 = p1;
    p0 = p2;
    p1 = p0;
    p1 = p2;
    p2 = p0;
    p2 = p1;
}

declare let pl0: PromiseLike<number>;
declare let pl1: PromiseLike<PromiseLike<number>>;
declare let pl2: PromiseLike<awaited number>;
pl0 = pl1;
pl0 = pl2;
pl1 = pl0;
pl1 = pl2;
pl2 = pl0;
pl2 = pl1;

function f2<T>(pl0: PromiseLike<T>, pl1: PromiseLike<PromiseLike<T>>, pl2: PromiseLike<awaited T>) {
    pl0 = pl1;
    pl0 = pl2;
    pl1 = pl0;
    pl1 = pl2;
    pl2 = pl0;
    pl2 = pl1;
}

pl0 = p0;
pl0 = p1;
pl0 = p2;
pl1 = p0;
pl1 = p1;
pl1 = p2;
pl2 = p0;
pl2 = p1;
pl2 = p2;

interface A<T> {
    x: awaited T;
}

declare let a1: A<number>;
declare let a2: A<Promise<number>>;
a1 = a2;
a2 = a1;

interface B<T> {
    a: A<T>;
}

declare let b1: B<number>;
declare let b2: B<Promise<number>>;
b1 = b2;
b2 = b1;


//// [awaitedVariance.js]
p0 = p1;
p0 = p2;
p1 = p0;
p1 = p2;
p2 = p0;
p2 = p1;
function f1(p0, p1, p2) {
    p0 = p1;
    p0 = p2;
    p1 = p0;
    p1 = p2;
    p2 = p0;
    p2 = p1;
}
pl0 = pl1;
pl0 = pl2;
pl1 = pl0;
pl1 = pl2;
pl2 = pl0;
pl2 = pl1;
function f2(pl0, pl1, pl2) {
    pl0 = pl1;
    pl0 = pl2;
    pl1 = pl0;
    pl1 = pl2;
    pl2 = pl0;
    pl2 = pl1;
}
pl0 = p0;
pl0 = p1;
pl0 = p2;
pl1 = p0;
pl1 = p1;
pl1 = p2;
pl2 = p0;
pl2 = p1;
pl2 = p2;
a1 = a2;
a2 = a1;
b1 = b2;
b2 = b1;

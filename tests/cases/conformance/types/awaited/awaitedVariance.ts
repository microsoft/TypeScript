// @target: es2015

declare let p0: Promise<number>;
declare let p1: Promise<Promise<number>>;
declare let p2: Promise<awaited number>;
p0 = p1;
p0 = p2;
p1 = p0;
p1 = p2;
p2 = p0;
p2 = p1;

function fn1<T>(p0: Promise<T>, p1: Promise<Promise<T>>, p2: Promise<awaited T>) {
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

interface C<T> {
    x: awaited ({_tag: string} & T);
}

declare let c1: C<number>;
declare let c2: C<Promise<number>>;
// Not assignable since `awaited ({_tag: string} & Promise<number>)` is `number`, which isn't assignable to `({_tag: string} & number)`.
c1 = c2;
c2 = c1;

interface D<T> {
    a: C<T>;
}

declare let d1: D<number>;
declare let d2: D<Promise<number>>;
// Not assignable since `awaited ({_tag: string} & Promise<number>)` is `number`, which isn't assignable to `({_tag: string} & number)`.
d1 = d2;
d2 = d1;

interface E<T> {
    x: awaited (T | {otherOption: string});
}

declare let e1: E<number>;
declare let e2: E<Promise<number>>;
e1 = e2;
e2 = e1;

interface F<T> {
    a: E<T>;
}

declare let f1: F<number>;
declare let f2: F<Promise<number>>;
f1 = f2;
f2 = f1;

interface G<T, K extends keyof T> {
    x: awaited T[K];
}

declare let g1: G<{x: number}, "x">;
declare let g2: G<{x: Promise<number>}, "x">;
g1 = g2;
g2 = g1;

interface H<T, K extends keyof T> {
    a: G<T, K>;
}

declare let h1: H<{x: number}, "x">;
declare let h2: H<{x: Promise<number>}, "x">;
h1 = h2;
h2 = h1;
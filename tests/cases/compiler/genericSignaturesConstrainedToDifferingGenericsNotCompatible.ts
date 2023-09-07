// @strict: true
type Fn<T> = <U extends T>(x: U) => U;

type Concrete1 = <U extends number>(x: U) => U;
type Concrete2 = <U extends string>(x: U) => U;

function f<T1, T2>(t1: Fn<T1>, t2: Fn<T2>, c1: Concrete1, c2: Concrete2) {
    // every single one of these assignments should error

    t1 = t2;
    t2 = t1;

    c1 = c2;
    c2 = c1;

    t1 = c1;
    c1 = t1;
}

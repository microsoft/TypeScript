interface Ctor<T> {
    new(): T;
}
// declare function create1<T>(ctor: Ctor<T>): T;
declare function create2<T, C extends Ctor<T>>(ctor: C): T;

class A { a: number }
// let a1 = create1(A).a; // a: A --> OK
let a2 = create2(A).a; // a: {} --> Should be A


class A {
    propA: number;
}

class B {
    propB: number;
}

class C extends A {
    propC: number;
}

declare function isB(p1): p1 is B;
declare function isC(p1): p1 is C;
declare function retC(x): C; 

declare function funA<T>(p1: (p1) => T): T;
declare function funB<T>(p1: (p1) => T, p2: any): p2 is T;
declare function funC<T>(p1: (p1) => p1 is T): T;
declare function funD<T>(p1: (p1) => p1 is T, p2: any): p2 is T;
declare function funE<T, U>(p1: (p1) => p1 is T, p2: U): T;

let a: A;
let test1: boolean = funA(isB);
if (funB(retC, a)) {
    a.propC;
}
let test2: B = funC(isB);
if (funD(isC, a)) {
    a.propC;
}
let test3: B = funE(isB, 1);
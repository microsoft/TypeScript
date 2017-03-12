class C1<T> {
    c1_prop: T;
}
class D1 extends C1 {
    d1_prop: number;
}

var d1 = new D1();
d1.c1_prop; // any
d1.d1_prop;


class C2<T> {
    constructor(a: T) { }
    c1_prop: T;
}
class D2 extends C2 {
    d1_prop: number;
}

var d1 = new D2(2);
d1.c1_prop; // any
d1.d1_prop;


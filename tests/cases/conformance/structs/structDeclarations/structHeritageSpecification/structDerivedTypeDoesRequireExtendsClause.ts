struct Base {
    foo: string;
}

struct Derived {
    foo: string;
    bar: number;
}

struct Derived2 extends Base {
    bar: string;
}

var b: Base;
var d1: Derived;
var d2: Derived2;
b = d1; // error, not structural typing
b = d2; // ok
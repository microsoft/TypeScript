// doc 2.3
// derived struct can override base struct's static property members

var x: { foo: string; }
var y: { foo: string; bar: string; }

struct Base {
    static r: typeof x;
    static s(a: typeof x) { return 1; }
    static u: (a: typeof x) => any;

    constructor(a: typeof x) { }
}

struct Derived extends Base {
    static r: typeof y; // ok
    static s(a: typeof y) { } // ok
    static u: (a: typeof y) => void; // ok

    constructor(a: typeof y) { super(x) }
}


/* struct Base2 {
    [i: string]: Object;
    [i: number]: typeof x;
}

struct Derived2 extends Base2 {
    [i: string]: typeof x;
    [i: number]: typeof y;
}

var d2: Derived2;
var r7 = d2[''];
var r8 = d2[1]; */


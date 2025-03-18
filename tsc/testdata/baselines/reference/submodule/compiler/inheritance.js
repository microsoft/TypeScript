//// [tests/cases/compiler/inheritance.ts] ////

//// [inheritance.ts]
class B1 {
    public x;
}

class B2 {
    public x;
}


class D1 extends B1 {
}

class D2 extends B2 {
}


class N {
    public y:number;
}

class ND extends N { // any is assignable to number
    public y;
}

class Good {
    public f: () => number = function () { return 0; }
    public g() { return 0; }
}

class Baad extends Good {
    public f(): number { return 0; }
    public g(n: number) { return 0; }
}


//// [inheritance.js]
class B1 {
    x;
}
class B2 {
    x;
}
class D1 extends B1 {
}
class D2 extends B2 {
}
class N {
    y;
}
class ND extends N {
    y;
}
class Good {
    f = function () { return 0; };
    g() { return 0; }
}
class Baad extends Good {
    f() { return 0; }
    g(n) { return 0; }
}

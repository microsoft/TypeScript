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

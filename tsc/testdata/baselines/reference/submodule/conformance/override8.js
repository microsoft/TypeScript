//// [tests/cases/conformance/override/override8.ts] ////

//// [override8.ts]
class B {
    a: string
}

class D extends B {
    constructor(public a: string, public b: string) {
        super();
    }
}

class BB {
    constructor(public a: string) {

    }
}

class DD extends BB {
    constructor(public a: string) {
        super(a)
    }
}

class DDD extends BB {
    public a: string;

    constructor(a: string) {
        super(a)
        this.a = a
    }
}

//// [override8.js]
class B {
    a;
}
class D extends B {
    a;
    b;
    constructor(a, b) {
        super();
        this.a = a;
        this.b = b;
    }
}
class BB {
    a;
    constructor(a) {
        this.a = a;
    }
}
class DD extends BB {
    a;
    constructor(a) {
        super(a);
        this.a = a;
    }
}
class DDD extends BB {
    a;
    constructor(a) {
        super(a);
        this.a = a;
    }
}

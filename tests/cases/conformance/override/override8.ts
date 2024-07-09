// @declaration: true
// @noImplicitOverride: true
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
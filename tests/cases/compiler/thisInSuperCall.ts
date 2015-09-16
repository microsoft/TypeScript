class Base { 
    constructor(x: any) {}
}

class Foo extends Base {
    constructor() {
        super(this); // error: "super" has to be called before "this" accessing
    }
}

class Foo2 extends Base {
    public p = 0;
    constructor() {
        super(this); // error
    }
}

class Foo3 extends Base {
    constructor(public p) {
        super(this); // error
    }
}
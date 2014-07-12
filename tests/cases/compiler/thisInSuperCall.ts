class Base { 
    constructor(x: any) {}
}

class Foo extends Base {
    constructor() {
        super(this); // no error
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
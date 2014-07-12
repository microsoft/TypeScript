class Base { 
    constructor(a: any) {}
}

class Foo extends Base {
    public x: number;
    constructor() {
        super(this); // no error
    }
}


class Foo2 extends Base {
    public x: number = 0;
    constructor() {
        super(this); // error
    }
}

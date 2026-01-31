//// [tests/cases/compiler/thisInSuperCall2.ts] ////

//// [thisInSuperCall2.ts]
class Base { 
    constructor(a: any) {}
}

class Foo extends Base {
    public x: number;
    constructor() {
        super(this); // error: "super" has to be called before "this" accessing
    }
}


class Foo2 extends Base {
    public x: number = 0;
    constructor() {
        super(this); // error
    }
}


//// [thisInSuperCall2.js]
class Base {
    constructor(a) { }
}
class Foo extends Base {
    constructor() {
        super(this); // error: "super" has to be called before "this" accessing
    }
}
class Foo2 extends Base {
    constructor() {
        super(this); // error
        this.x = 0;
    }
}

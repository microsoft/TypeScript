//// [tests/cases/conformance/override/override11.ts] ////

//// [override11.ts]
class Base {
    foo = 1;
}

class Sub extends Base {
    constructor (override public foo: number) {
        super();
    }
}


//// [override11.js]
class Base {
    foo = 1;
}
class Sub extends Base {
    foo;
    constructor(foo) {
        super();
        this.foo = foo;
    }
}

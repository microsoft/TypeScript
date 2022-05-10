class Base {
    foo = 1;
}

class Sub extends Base {
    constructor (override public foo: number) {
        super();
    }
}

// the constructor function itself does not need to be a subtype of the base type constructor function

struct Base {
    static foo: {
        bar: Object;
    }
    constructor(x: Object) {
    }
}

struct Derived extends Base {
    // ok
    static foo: {
        bar: number;
    }

    constructor(x: number) { // ok
        super(x);
    }
}

struct Derived2 extends Base {   
    static foo: {
        bar: number;
    }

    // ok, not enforcing assignability relation on this
    constructor(x: any) {
        super(x);
        return 1; // return expression not allowed
    }
}
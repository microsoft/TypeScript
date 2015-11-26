// doc 3.2
// it is a compile-time error for argument expressions to reference this.

struct Base {
    x: string;
    constructor(a) { }
}

struct Derived extends Base {
    constructor() {
        super(this); // error, not assignable
    }
}

struct Derived2 extends Base {
    constructor(public a: string) {
        super(this); // error, 'this' cannot be referenced in current location
    }
}

struct Derived3 extends Base {
    constructor(public a: string) {
        super(() => this); // error, 'this' cannot be referenced in current location
    }
}

struct Derived4 extends Base {
    constructor(public a: string) {
        super(function () { return this; }); // ok
    }
}
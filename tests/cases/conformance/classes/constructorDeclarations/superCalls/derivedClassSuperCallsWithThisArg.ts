class Base {
    x: string;
    constructor(a) { }
}

class Derived extends Base {
    constructor() {
        super(this); // ok
    }
}

class Derived2 extends Base {
    constructor(public a: string) {
        super(this); // error
    }
}

class Derived3 extends Base {
    constructor(public a: string) {
        super(() => this); // error
    }
}

class Derived4 extends Base {
    constructor(public a: string) {
        super(function () { return this; }); // ok
    }
}
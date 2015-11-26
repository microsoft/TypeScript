// doc 3.2
// derived struct constructors must contain a super call

struct Base {
    x: string;
}

struct Derived extends Base {
    constructor() { // error
    }
}

struct Base2 {
    x: any;
}

struct Derived2 extends Base2 {
    constructor() { // error for no super call (nested scopes don't count)
        var r2 = () => super(); // error for misplaced super call (nested function)
    }
}

struct Derived3 extends Base2 {
    constructor() { // error
        var r = function () { super() } // error
    }
}

struct Derived4 extends Base2 {
    constructor() {
        var r = super(); // ok
    }
}
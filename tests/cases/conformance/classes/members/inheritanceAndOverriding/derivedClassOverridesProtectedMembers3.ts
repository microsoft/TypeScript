// @target: ES5

var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    a: typeof x;
    b(a: typeof x) { }
    get c() { return x; }
    set c(v: typeof x) { }
    d: (a: typeof x) => void;

    static r: typeof x;
    static s(a: typeof x) { }
    static get t() { return x; }
    static set t(v: typeof x) { }
    static u: (a: typeof x) => void;

    constructor(a: typeof x) {}
}

// Errors
// decrease visibility of all public members to protected
class Derived1 extends Base {
    protected a: typeof x;
    constructor(a: typeof x) { super(a); }
}

class Derived2 extends Base {
    protected b(a: typeof x) { }
    constructor(a: typeof x) { super(a); }
}

class Derived3 extends Base {
    protected get c() { return x; }
    constructor(a: typeof x) { super(a); }
}

class Derived4 extends Base {
    protected set c(v: typeof x) { }
    constructor(a: typeof x) { super(a); }
}

class Derived5 extends Base {
    protected d: (a: typeof x) => void ;
    constructor(a: typeof x) { super(a); }
}

class Derived6 extends Base {
    protected static r: typeof x;
    constructor(a: typeof x) { super(a); }
}

class Derived7 extends Base {
    protected static s(a: typeof x) { }
    constructor(a: typeof x) { super(a); }
}

class Derived8 extends Base {
    protected static get t() { return x; }
    constructor(a: typeof x) { super(a); }
}

class Derived9 extends Base {
    protected static set t(v: typeof x) { }
    constructor(a: typeof x) { super(a); }
}

class Derived10 extends Base {
    protected static u: (a: typeof x) => void ;
    constructor(a: typeof x) { super(a); }
}
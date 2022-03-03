// @strict: true
class A {
    property = 'x';
    m() { return 1 }
}
class B extends A {
    property: any; // error
}
class BD extends A {
    declare property: any; // ok because it's implicitly initialised
}
class BDBang extends A {
    declare property!: any; // ! is not allowed, this is an ambient declaration
}
class BOther extends A {
    declare m() { return 2 } // not allowed on methods
    declare nonce: any; // ok, even though it's not in the base
    declare property = 'y' // initialiser not allowed with declare
}
class U {
    declare nonce: any; // ok, even though there's no base
}

class C {
    p: string;
}
class D extends C {
    p: 'hi'; // error
}
class DD extends C {
    declare p: 'bye'; // ok
}


declare class E {
    p1: string
    p2: string
}
class F extends E {
    p1!: 'z'
    declare p2: 'alpha'
}

class G extends E {
    p1: 'z'
    constructor() {
        super()
        this.p1 = 'z'
    }
}

abstract class H extends E {
    abstract p1: 'a' | 'b' | 'c'
    declare abstract p2: 'a' | 'b' | 'c'
}

interface I {
    q: number
}
interface J extends I { }
class J {
    r = 5
}
class K extends J {
    q!: 1 | 2 | 3 // ok, extends a property from an interface
    r!: 4 | 5 // error, from class
}

// #35327
class L {
    a: any;
    constructor(arg: any) {
        this.a = arg;
    }
}
class M extends L {
    declare a: number;
    constructor(arg: number) {
        super(arg);
        console.log(this.a);  // should be OK, M.a is ambient
    }
}

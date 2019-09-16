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
    declare property!: any; // doesn't need !, but is still allowed
}
class BOther extends A {
    declare m() { return 2 } // not allowed on methods
    declare nonce: any; // only allowed when exists in base
    declare property = 'y' // initialiser not allowed with declare
}
class U {
    declare nonce: any; // ambient declaration only allowed when an override
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

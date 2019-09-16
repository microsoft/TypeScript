// @strict: true
class A {
    property = 'x';
    m() { return 1 }
}
class B extends A {
    property; // error
}
class BD extends A {
    declare property; // still has implicit any, but is implicitly initialised
}
class BDBang extends A {
    declare property!; // still has implicit any, doesn't need !, but has it anyway
}
class BOther extends A {
    declare m() { return 2 } // not allowed on methods
    declare nonce; // only allowed when exists in base
    declare property = 'y' // initialiser not allowed with declare
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

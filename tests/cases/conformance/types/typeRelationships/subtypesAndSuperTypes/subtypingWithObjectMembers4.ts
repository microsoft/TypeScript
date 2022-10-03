// subtyping when property names do not match

class Base {
    foo: string;
}

class Derived extends Base {
    bar: string;
}

class A {
    foo: Base;
}

class B extends A {
    fooo: Derived; // ok, inherits foo
}

class A2 {
    1: Base; 
}

class B2 extends A2 {
    1.1: Derived; // ok, inherits 1
}

class A3 {
    '1': Base;
}

class B3 extends A3 {
    '1.1': Derived; // ok, inherits '1'
}
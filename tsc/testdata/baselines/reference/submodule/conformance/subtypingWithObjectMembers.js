//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithObjectMembers.ts] ////

//// [subtypingWithObjectMembers.ts]
class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }

// N and M have the same name, same accessibility, same optionality, and N is a subtype of M
// foo properties are valid, bar properties cause errors in the derived class declarations
class A {
    foo: Base;
    bar: Base;
}

class B extends A {
    foo: Derived; // ok
    bar: string; // error
}

class A2 {
    1: Base; 
    2.0: Base;
}

class B2 extends A2 {
    1: Derived; // ok
    2: string; // error
}

class A3 {
    '1': Base;
    '2.0': Base;
}

class B3 extends A3 {
    '1': Derived; // ok
    '2.0': string; // error
}

module TwoLevels {
    class A {
        foo: Base;
        bar: Base;
    }

    class B extends A {
        foo: Derived2; // ok
        bar: string; // error
    }

    class A2 {
        1: Base;
        2.0: Base;
    }

    class B2 extends A2 {
        1: Derived2; // ok
        2: string; // error
    }

    class A3 {
        '1': Base;
        '2.0': Base;
    }

    class B3 extends A3 {
        '1': Derived2; // ok
        '2.0': string; // error
    }
}

//// [subtypingWithObjectMembers.js]
class Base {
    foo;
}
class Derived extends Base {
    bar;
}
class Derived2 extends Derived {
    baz;
}
// N and M have the same name, same accessibility, same optionality, and N is a subtype of M
// foo properties are valid, bar properties cause errors in the derived class declarations
class A {
    foo;
    bar;
}
class B extends A {
    foo; // ok
    bar; // error
}
class A2 {
    1;
    2.0;
}
class B2 extends A2 {
    1; // ok
    2; // error
}
class A3 {
    '1';
    '2.0';
}
class B3 extends A3 {
    '1'; // ok
    '2.0'; // error
}
var TwoLevels;
(function (TwoLevels) {
    class A {
        foo;
        bar;
    }
    class B extends A {
        foo; // ok
        bar; // error
    }
    class A2 {
        1;
        2.0;
    }
    class B2 extends A2 {
        1; // ok
        2; // error
    }
    class A3 {
        '1';
        '2.0';
    }
    class B3 extends A3 {
        '1'; // ok
        '2.0'; // error
    }
})(TwoLevels || (TwoLevels = {}));

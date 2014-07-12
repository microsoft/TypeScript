//// [subtypingWithObjectMembers3.ts]
interface Base {
    foo: string;
}

interface Derived extends Base {
    bar: string;
}

// N and M have the same name, same accessibility, same optionality, and N is a subtype of M
// foo properties are valid, bar properties cause errors in the derived class declarations
module NotOptional {
    interface A {
        foo: Base;
        bar: Derived;
    }

    interface B extends A {
        foo: Derived; // ok
        bar: Base; // error
    }

    interface A2 {
        1: Base;
        2.0: Derived;
    }

    interface B2 extends A2 {
        1: Derived; // ok
        2: Base; // error
    }

    interface A3 {
        '1': Base;
        '2.0': Derived;
    }

    interface B3 extends A3 {
        '1': Derived; // ok
        '2.0': Base; // error
    }
}

module Optional {
    interface A {
        foo?: Base;
        bar?: Derived;
    }

    interface B extends A {
        foo?: Derived; // ok
        bar?: Base; // error
    }

    interface A2 {
        1?: Base;
        2.0?: Derived;
    }

    interface B2 extends A2 {
        1?: Derived; // ok
        2?: Base; // error
    }

    interface A3 {
        '1'?: Base;
        '2.0'?: Derived;
    }

    interface B3 extends A3 {
        '1'?: Derived; // ok
        '2.0'?: Base; // error
    }
}

//// [subtypingWithObjectMembers3.js]

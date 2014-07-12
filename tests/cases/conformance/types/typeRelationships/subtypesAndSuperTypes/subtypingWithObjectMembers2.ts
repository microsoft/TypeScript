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
        bar: Base;
    }

    interface B extends A {
        foo: Derived; // ok
        bar: string; // error
    }

    interface A2 {
        1: Base;
        2.0: Base;
    }

    interface B2 extends A2 {
        1: Derived; // ok
        2: string; // error
    }

    interface A3 {
        '1': Base;
        '2.0': Base;
    }

    interface B3 extends A3 {
        '1': Derived; // ok
        '2.0': string; // error
    }
}

// same cases as above but with optional
module Optional {
    interface A {
        foo?: Base;
        bar?: Base;
    }

    interface B extends A {
        foo?: Derived; // ok
        bar?: string; // error
    }

    interface A2 {
        1?: Base;
        2.0?: Base;
    }

    interface B2 extends A2 {
        1?: Derived; // ok
        2?: string; // error
    }

    interface A3 {
        '1'?: Base;
        '2.0'?: Base;
    }

    interface B3 extends A3 {
        '1'?: Derived; // ok
        '2.0'?: string; // error
    }
}
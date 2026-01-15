// members N and M of types S and T have the same name, same accessibility, same optionality, and N is assignable M

namespace TargetIsPublic {
    // targets
    class Base {
        public foo: string;
    }

    interface I {
        foo: string;
    }

    declare var a: { foo: string; };
    declare var b: Base;
    declare var i: I;

    // sources
    class D {
        public foo: string;
    }

    class E {
        private foo: string;
    }
    declare var d: D;
    declare var e: E;

    a = b;
    a = i;
    a = d;
    a = e; // error

    b = a;
    b = i;
    b = d;
    b = e; // error

    i = a;
    i = b;
    i = d;
    i = e; // error

    d = a;
    d = b;
    d = i;
    d = e; // error

    e = a; // errror
    e = b; // errror
    e = i; // errror
    e = d; // errror
    e = e; 

}

namespace TargetIsPublic {
    // targets
    class Base {
        private foo: string;
    }

    interface I extends Base {
    }

    declare var a: { foo: string; };
    declare var b: Base;
    declare var i: I;

    // sources
    class D {
        public foo: string;
    }

    class E {
        private foo: string;
    }

    declare var d: D;
    declare var e: E;

    a = b; // error
    a = i; // error
    a = d;
    a = e; // error

    b = a; // error
    b = i;
    b = d; // error
    b = e; // error
    b = b;
    
    i = a; // error
    i = b;
    i = d; // error
    i = e; // error
    i = i;

    d = a;
    d = b; // error
    d = i; // error
    d = e; // error

    e = a; // errror
    e = b; // errror
    e = i; // errror
    e = d; // errror
    e = e;

}
//// [tests/cases/conformance/expressions/superCalls/errorSuperCalls.ts] ////

//// [errorSuperCalls.ts]
//super call in class constructor with no base type
class NoBase {
    constructor() {
        super();
    }

    //super call in class member function with no base type
    fn() {
        super();
    }

    //super call in class accessor (get and set) with no base type
    get foo() {
        super();
        return null;
    }
    set foo(v) {
        super();
    }

    //super call in class member initializer with no base type
    p = super();

    //super call in static class member function with no base type
    static fn() {
        super();
    }

    //super call in static class member initializer with no base type
    static k = super();

    //super call in static class accessor (get and set) with no base type
    static get q() {
        super();
        return null;
    }
    static set q(n) {
        super();
    }
}

class Base<T> { private n: T; }
class Derived<T> extends Base<T> {
    //super call with type arguments 
    constructor() {
        super<string>();
        super();
    }
}


class OtherBase {
    private n: string;
}

class OtherDerived extends OtherBase {
    //super call in class member initializer of derived type
    t = super();

    fn() {
        //super call in class member function of derived type
        super();
    }

    //super call in class accessor (get and set) of derived type
    get foo() {
        super();
        return null;
    }
    set foo(n) {
        super();
    }
}


//// [errorSuperCalls.js]
//super call in class constructor with no base type
let NoBase = (() => {
    class NoBase {
        constructor() {
            super();
            //super call in class member initializer with no base type
            this.p = super();
        }
        //super call in class member function with no base type
        fn() {
            super();
        }
        //super call in class accessor (get and set) with no base type
        get foo() {
            super();
            return null;
        }
        set foo(v) {
            super();
        }
        //super call in static class member function with no base type
        static fn() {
            super();
        }
        //super call in static class accessor (get and set) with no base type
        static get q() {
            super();
            return null;
        }
        static set q(n) {
            super();
        }
    }
    //super call in static class member initializer with no base type
    NoBase.k = super();
    return NoBase;
})();
class Base {
}
class Derived extends Base {
    //super call with type arguments 
    constructor() {
        super();
        super();
    }
}
class OtherBase {
}
class OtherDerived extends OtherBase {
    constructor() {
        super(...arguments);
        //super call in class member initializer of derived type
        this.t = super();
    }
    fn() {
        //super call in class member function of derived type
        super();
    }
    //super call in class accessor (get and set) of derived type
    get foo() {
        super();
        return null;
    }
    set foo(n) {
        super();
    }
}

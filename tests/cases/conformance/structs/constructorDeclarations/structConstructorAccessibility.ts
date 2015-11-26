// doc 3
// Only public constructors are supported. Private and protected constructors result in an error

struct C {
    public constructor(public x: number) { }
}

struct D {
    private constructor(public x: number) { } // error
}

struct E {
    protected constructor(public x: number) { } // error
}

var c = new C(1);
var d = new D(1);
var e = new E(1);

/* module Generic {
    struct C<T> {
        public constructor(public x: T) { }
    }

    struct D<T> {
        private constructor(public x: T) { } // error
    }

    struct E<T> {
        protected constructor(public x: T) { } // error
    }

    var c = new C(1);
    var d = new D(1);
    var e = new E(1);
} */

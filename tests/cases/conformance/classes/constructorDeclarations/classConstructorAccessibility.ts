// @declaration: true

class B {
    constructor(public x: number) { }
}

class C {
    public constructor(public x: number) { }
}

class D {
    private constructor(public x: number) { }
}

class E {
    protected constructor(public x: number) { }
}

var b = new B(1);
var c = new C(1);
var d = new D(1); // error - D is private
var e = new E(1); // error - E is protected

module Generic {
    class C<T> {
        public constructor(public x: T) { }
    }

    class D<T> {
        private constructor(public x: T) { }
    }

    class E<T> {
        protected constructor(public x: T) { }
    }

    var b = new B(1);
    var c = new C(1);
    var d = new D(1); // error - D is private
    var e = new E(1); // error - E is protected
}

// make sure signatures are covered.
let sig: new(x: number) => any;
sig = B;
sig = C;
sig = D; // error - private to public
sig = E; // error - protected to public
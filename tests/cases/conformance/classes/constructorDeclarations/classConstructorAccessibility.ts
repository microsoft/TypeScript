class C {
    public constructor(public x: number) { }
}

class D {
    private constructor(public x: number) { } // error
}

var c = new C(1);
var d = new D(1);

module Generic {
    class C<T> {
        public constructor(public x: T) { }
    }

    class D<T> {
        private constructor(public x: T) { } // error
    }

    var c = new C(1);
    var d = new D(1);
}

class Foo {
    private x: string;
}

interface I extends Foo {
    y: number;
}

class Bar extends Foo implements I { // ok
    y: number;
}

class Bar2 extends Foo implements I { // error
    x: string;
    y: number;
}

class Bar3 extends Foo implements I { // error
    private x: string;
    y: number;
}

// another level of indirection
module M {
    class Foo {
        private x: string;
    }

    class Baz extends Foo {
        z: number;
    }

    interface I extends Baz {
        y: number;
    }

    class Bar extends Foo implements I { // ok
        y: number;
        z: number;
    }

    class Bar2 extends Foo implements I { // error
        x: string;
        y: number;
    }

    class Bar3 extends Foo implements I { // error
        private x: string;
        y: number;
    }
}

// two levels of privates
module M2 {
    class Foo {
        private x: string;
    }

    class Baz extends Foo {
        private y: number;
    }

    interface I extends Baz {
        z: number;
    }

    class Bar extends Foo implements I { // error
        z: number;
    }

    var b: Bar;
    var r1 = b.z;
    var r2 = b.x; // error
    var r3 = b.y; // error

    class Bar2 extends Foo implements I { // error
        x: string;
        z: number;
    }

    class Bar3 extends Foo implements I { // error
        private x: string;
        z: number;
    }
}
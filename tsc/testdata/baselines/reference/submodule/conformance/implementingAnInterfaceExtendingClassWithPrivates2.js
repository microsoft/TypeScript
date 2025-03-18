//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/implementingAnInterfaceExtendingClassWithPrivates2.ts] ////

//// [implementingAnInterfaceExtendingClassWithPrivates2.ts]
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

//// [implementingAnInterfaceExtendingClassWithPrivates2.js]
class Foo {
    x;
}
class Bar extends Foo {
    y;
}
class Bar2 extends Foo {
    x;
    y;
}
class Bar3 extends Foo {
    x;
    y;
}
var M;
(function (M) {
    class Foo {
        x;
    }
    class Baz extends Foo {
        z;
    }
    class Bar extends Foo {
        y;
        z;
    }
    class Bar2 extends Foo {
        x;
        y;
    }
    class Bar3 extends Foo {
        x;
        y;
    }
})(M || (M = {}));
var M2;
(function (M2) {
    class Foo {
        x;
    }
    class Baz extends Foo {
        y;
    }
    class Bar extends Foo {
        z;
    }
    var b;
    var r1 = b.z;
    var r2 = b.x;
    var r3 = b.y;
    class Bar2 extends Foo {
        x;
        z;
    }
    class Bar3 extends Foo {
        x;
        z;
    }
})(M2 || (M2 = {}));

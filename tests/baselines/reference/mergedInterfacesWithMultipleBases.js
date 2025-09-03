//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithMultipleBases.ts] ////

//// [mergedInterfacesWithMultipleBases.ts]
// merged interfaces behave as if all extends clauses from each declaration are merged together
// no errors expected

class C {
    a: number;
}

class C2 {
    b: number;
}

interface A extends C {
    y: string;
}

interface A extends C2 {
    z: string;
}

class D implements A {
    a: number;
    b: number;
    y: string;
    z: string;
}

var a: A;
var r = a.a;

// generic interfaces in a module
module M {
    class C<T> {
        a: T;
    }

    class C2<T> {
        b: T;
    }

    interface A<T> extends C<T> {
        y: T;
    }

    interface A<T> extends C2<string> {
        z: T;
    }

    class D implements A<boolean> {
        a: boolean;
        b: string;
        y: boolean;
        z: boolean;
    }
}

//// [mergedInterfacesWithMultipleBases.js]
// merged interfaces behave as if all extends clauses from each declaration are merged together
// no errors expected
class C {
    a;
}
class C2 {
    b;
}
class D {
    a;
    b;
    y;
    z;
}
var a;
var r = a.a;
// generic interfaces in a module
var M;
(function (M) {
    class C {
        a;
    }
    class C2 {
        b;
    }
    class D {
        a;
        b;
        y;
        z;
    }
})(M || (M = {}));

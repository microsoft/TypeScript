//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithMultipleBases2.ts] ////

//// [mergedInterfacesWithMultipleBases2.ts]
// merged interfaces behave as if all extends clauses from each declaration are merged together
// no errors expected

class C {
    a: number;
}

class C2 {
    b: number;
}

class C3 {
    c: string;
}

class C4 {
    d: string;
}


interface A extends C, C3 {
    y: string;
}

interface A extends C2, C4 {
    z: string;
}

class D implements A {
    a: number;
    b: number;
    c: string;
    d: string;
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

    class C3<T> {
        c: T;
    }

    class C4<T> {
        d: T;
    }

    interface A<T> extends C<T>, C3<T> {
        y: T;
    }

    interface A<T> extends C2<string>, C4<string> {
        z: T;
    }

    class D implements A<boolean> {
        a: boolean;
        b: string;
        c: boolean;
        d: string;
        y: boolean;
        z: boolean;
    }
}

//// [mergedInterfacesWithMultipleBases2.js]
// merged interfaces behave as if all extends clauses from each declaration are merged together
// no errors expected
class C {
    a;
}
class C2 {
    b;
}
class C3 {
    c;
}
class C4 {
    d;
}
class D {
    a;
    b;
    c;
    d;
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
    class C3 {
        c;
    }
    class C4 {
        d;
    }
    class D {
        a;
        b;
        c;
        d;
        y;
        z;
    }
})(M || (M = {}));

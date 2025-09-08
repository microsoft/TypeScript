//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithInheritedPrivates.ts] ////

//// [mergedInterfacesWithInheritedPrivates.ts]
class C {
    private x: number;
}

interface A extends C {
    y: string;
}

interface A {
    z: string;
}

class D implements A { // error
    private x: number;
    y: string;
    z: string;
}

class E implements A { // error
    x: number;
    y: string;
    z: string;
}

var a: A;
var r = a.x; // error

//// [mergedInterfacesWithInheritedPrivates.js]
class C {
    x;
}
class D {
    x;
    y;
    z;
}
class E {
    x;
    y;
    z;
}
var a;
var r = a.x; // error

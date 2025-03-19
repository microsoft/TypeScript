//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithInheritedPrivates2.ts] ////

//// [mergedInterfacesWithInheritedPrivates2.ts]
class C {
    private x: number;
}

class C2 {
    private w: number;
}

interface A extends C {
    y: string;
}

interface A extends C2 {
    z: string;
}

class D extends C implements A { // error
    private w: number;
    y: string;
    z: string;
}

class E extends C2 implements A { // error
    w: number;
    y: string;
    z: string;
}

var a: A;
var r = a.x; // error
var r2 = a.w; // error

//// [mergedInterfacesWithInheritedPrivates2.js]
class C {
    x;
}
class C2 {
    w;
}
class D extends C {
    w;
    y;
    z;
}
class E extends C2 {
    w;
    y;
    z;
}
var a;
var r = a.x; // error
var r2 = a.w; // error

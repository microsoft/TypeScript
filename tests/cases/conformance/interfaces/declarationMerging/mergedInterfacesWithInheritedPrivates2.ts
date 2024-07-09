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
// @target: es5
// no errors expected

class C {
    public x: string;
    public y(a: number): number { return null; }
    public get z() { return 1; }
    public set z(v) { }
    [x: string]: Object;
    [x: number]: Object;
    0: number;

    public static foo: string; // doesn't effect equivalence
}

interface I {
    x: string;
    y(b: number): number;
    z: number;
    [x: string]: Object;
    [x: number]: Object;
    0: number;
}

var c: C;
var i: I;
c = i;
i = c;
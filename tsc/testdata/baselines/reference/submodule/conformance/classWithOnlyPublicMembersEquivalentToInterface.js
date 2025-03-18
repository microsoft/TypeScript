//// [tests/cases/conformance/types/namedTypes/classWithOnlyPublicMembersEquivalentToInterface.ts] ////

//// [classWithOnlyPublicMembersEquivalentToInterface.ts]
// no errors expected

class C {
    public x: string;
    public y(a: number): number { return null; }
    public get z() { return 1; }
    public set z(v) { }
    [x: string]: Object;
    [x: number]: Object;
    0: number;
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

//// [classWithOnlyPublicMembersEquivalentToInterface.js]
class C {
    x;
    y(a) { return null; }
    get z() { return 1; }
    set z(v) { }
    0;
}
var c;
var i;
c = i;
i = c;

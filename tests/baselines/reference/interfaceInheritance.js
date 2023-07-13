//// [tests/cases/compiler/interfaceInheritance.ts] ////

//// [interfaceInheritance.ts]
interface I1 {
    i1P1: number;
    i1P2(): void;
}

interface I2 extends I1 {
    i2P1: string;
}

interface I3 {
    i2P1: string; // has a member from i2P1, but not from I1
}

interface I4 {
	one: number;
}

interface I5 {
	one: string;
}

class C1 implements I2 { // should be an error - it doesn't implement the members of I1
    public i2P1: string;
}

var i2: I2;
var i1: I1;
var i3: I3;
i1 = i2;
i2 = i3; // should be an error - i3 does not implement the members of i1

var c1: C1;

var i4: I4;
var i5: I5;

i4 = i5; // should be an error
i5 = i4; // should be an error



//// [interfaceInheritance.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var i2;
var i1;
var i3;
i1 = i2;
i2 = i3; // should be an error - i3 does not implement the members of i1
var c1;
var i4;
var i5;
i4 = i5; // should be an error
i5 = i4; // should be an error

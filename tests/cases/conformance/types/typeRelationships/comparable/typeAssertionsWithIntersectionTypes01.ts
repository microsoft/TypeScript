interface I1 {
    p1: number
}

interface I2 extends I1 {
    p2: number;
}

interface I3 {
    p3: number;
}

var x = { p1: 10, p2: 20, p3: 30 };
var y: I1 & I3 = x;
var z: I2 = x;

var a = <I1 & I3>z;
var b = <I3>z;
var c = <I2>z;
var d = <I1>y;

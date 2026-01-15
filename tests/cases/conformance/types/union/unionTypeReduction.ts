interface I2 {
    (): number;
    (q): boolean;
}

interface I3 {
    (): number;
}

var i2: I2, i3: I3;

var e1: I2 | I3;
var e2 = i2 || i3;  // Type of e2 immediately reduced to I3

var r1 = e1();  // Type of e1 reduced to I3 upon accessing property or signature
var r2 = e2();

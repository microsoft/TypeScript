// no errors 

interface A {
    length: number;
}

interface B extends A {
    width: number;
}

interface C extends B {
    radius: number;
    bar: string;
}

var x: A|B|C;

if (x.length && x.width) {
    var r = x.width; // x is B|C
    if (x.radius) {
        var r2 = x.bar; // x is C
    }
}

if (x.length && x.width && x.bar) {
    var r3 = x.radius;
}

var r4 = x.radius ? x.bar : x.length;
var r5 = x.length && x.width ? (x.radius ? x.bar : x.length) : x.length;
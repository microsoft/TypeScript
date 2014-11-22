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

// unions that are subtypes get collapsed even without type guards
var r6 = !x.bar && x; // x narrowed to A|B but r6 is A after collapsing
var r7 = !x.bar && !x.width && x.length; // x narrowed to A|B then A
var r8 = !x.length && x; // x is A|B|C but r8 is A
var r9 = !x.width || x; // x is B|C but r9 is B
var r10 = !x.bar || !x.width || x; // x narrowed to C but then isn't narrowed further on .width because x isn't a union type anymore
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

if (x.width && x.ba) { // error
    var r = x.width; // x is A|B|C
}

var r2 = x.width; // error
var r3 = x.length ? x.width : x.radius; // errors
var r4 = x.width ? x.length : x.radius; // error

var y: Array<A> | string;
var r5 = y.length ? y.lastIndexOf : y.filter; // error on filter
var r6 = y.filter ? y.push : y.substr;
var r7 = y.filter ? y.substr : y.push; // errors

if (y.filter) {
    var r8 = y.push; 
} else {
    var r9 = y.substr;
}

if (y.filter) {
    var r10 = y.substr; // error
} else {
    var r11 = y.push; // error
}
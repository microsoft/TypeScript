//// [assignFromNumberInterface2.ts]
interface Number {
    doStuff(): string;
}

interface NotNumber {
    toString(radix?: number): string;
    toFixed(fractionDigits?: number): string;
    toExponential(fractionDigits?: number): string;
    toPrecision(precision?: number): string;
    valueOf(): number;
    doStuff(): string;
}

var x = 1;
var a: Number;
var b: NotNumber;

a = x; 
a = b; 

b = a; 
b = x; 

x = a; // expected error
x = b; // expected error



//// [assignFromNumberInterface2.js]
var x = 1;
var a;
var b;
a = x;
a = b;
b = a;
b = x;
x = a; // expected error
x = b; // expected error

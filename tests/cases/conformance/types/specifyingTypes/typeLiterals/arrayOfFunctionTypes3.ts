// valid uses of arrays of function types

var x = [() => 1, () => { }];
var r2 = x[0]();

class C {
    foo: string;
}
var y = [C, C];
var r3 = new y[0]();

var a: { (x: number): number; (x: string): string; };
var b: { (x: number): number; (x: string): string; };
var c: { (x: number): number; (x: any): any; };
var z = [a, b, c];
var r4 = z[0];
var r5 = r4(''); // any not string
var r5b = r4(1);

var a2: { <T>(x: T): number; (x: string): string;};
var b2: { <T>(x: T): number; (x: string): string; };
var c2: { (x: number): number; <T>(x: T): any; };

var z2 = [a2, b2, c2];
var r6 = z2[0];
var r7 = r6(''); // any not string
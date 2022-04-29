enum E { a, b, c }

var a: any;
var b: boolean;
var c: number;
var d: string;
var e: Object;
var f: void;
var g: E;

var x: string;

// string could plus every type, and the result is always string
// string as left operand
var r1 = x + a;
var r2 = x + b;
var r3 = x + c;
var r4 = x + d;
var r5 = x + e;
var r6 = x + f;
var r7 = x + g;

// string as right operand
var r8 = a + x;
var r9 = b + x;
var r10 = c + x;
var r11 = d + x;
var r12 = e + x;
var r13 = f + x;
var r14 = g + x;

// other cases
var r15 = x + E;
var r16 = x + E.a;
var r17 = x + '';
var r18 = x + 0;
var r19 = x + { a: '' };
var r20 = x + [];
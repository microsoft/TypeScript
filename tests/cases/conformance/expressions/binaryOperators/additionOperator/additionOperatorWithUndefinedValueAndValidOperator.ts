// If one operand is the null or undefined value, it is treated as having the type of the other operand.

enum E { a, b, c }

var a: any;
var b: number;
var c: E;
var d: string;

// undefined + any
var r1: any = undefined + a;
var r2: any = a + undefined;

// undefined + number/enum
var r3 = undefined + b;
var r4 = undefined + 1;
var r5 = undefined + c;
var r6 = undefined + E.a;
var r7 = undefined + E['a'];
var r8 = b + undefined;
var r9 = 1 + undefined;
var r10 = c + undefined
var r11 = E.a + undefined;
var r12 = E['a'] + undefined;

// undefined + string
var r13 = undefined + d;
var r14 = undefined + '';
var r15 = d + undefined;
var r16 = '' + undefined;
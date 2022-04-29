// string can add every type, and result string cannot be assigned to below types
enum E { a, b, c }

var x1: boolean;
x1 += '';

var x2: number;
x2 += '';

var x3: E;
x3 += '';

var x4: {a: string};
x4 += '';

var x5: void;
x5 += '';
enum E { a, b, c }

declare var a: any;
declare var b: number;
declare var c: E;

declare var x1: any;
x1 *= a;
x1 *= b;
x1 *= c;
x1 *= null;
x1 *= undefined;

declare var x2: number;
x2 *= a;
x2 *= b;
x2 *= c;
x2 *= null;
x2 *= undefined;

declare var x3: E;
x3 *= a;
x3 *= b;
x3 *= c;
x3 *= null;
x3 *= undefined;
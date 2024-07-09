enum E { a, b }

var a: any;
var b: void;

var x1: boolean;
x1 *= a;
x1 *= b;
x1 *= true;
x1 *= 0;
x1 *= ''
x1 *= E.a;
x1 *= {};
x1 *= null;
x1 *= undefined;

var x2: string;
x2 *= a;
x2 *= b;
x2 *= true;
x2 *= 0;
x2 *= ''
x2 *= E.a;
x2 *= {};
x2 *= null;
x2 *= undefined;

var x3: {};
x3 *= a;
x3 *= b;
x3 *= true;
x3 *= 0;
x3 *= ''
x3 *= E.a;
x3 *= {};
x3 *= null;
x3 *= undefined;

var x4: void;
x4 *= a;
x4 *= b;
x4 *= true;
x4 *= 0;
x4 *= ''
x4 *= E.a;
x4 *= {};
x4 *= null;
x4 *= undefined;

var x5: number;
x5 *= b;
x5 *= true;
x5 *= ''
x5 *= {};

var x6: E;
x6 *= b;
x6 *= true;
x6 *= ''
x6 *= {};
enum E { a, b }

var a: void;

var x1: boolean;
x1 += a;
x1 += true;
x1 += 0;
x1 += E.a;
x1 += {};
x1 += null;
x1 += undefined;

var x2: {};
x2 += a;
x2 += true;
x2 += 0;
x2 += E.a;
x2 += {};
x2 += null;
x2 += undefined;

var x3: void;
x3 += a;
x3 += true;
x3 += 0;
x3 += E.a;
x3 += {};
x3 += null;
x3 += undefined;

var x4: number;
x4 += a;
x4 += true;
x4 += {};

var x5: E;
x5 += a;
x5 += true;
x5 += {};
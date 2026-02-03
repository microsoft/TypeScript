//// [tests/cases/compiler/overshifts.ts] ////

//// [overshifts.ts]
1 << 1; // ok
1 << 32; // overshift
1 << 123;
1 << 1024;
1 << -1; // OK-ish
1 << -32; // backwards overshift
1 << -123;
1 << -1024;

0xFF_FF_FF_FF >> 1; // ok
0xFF_FF_FF_FF >> 32; // overshift
0xFF_FF_FF_FF >> 123;
0xFF_FF_FF_FF >> 1024;
0xFF_FF_FF_FF >> -1; // OK-ish
0xFF_FF_FF_FF >> -32; // backwards overshift
0xFF_FF_FF_FF >> -123;
0xFF_FF_FF_FF >> -1024;

0xFF_FF_FF_FF >>> 1; // ok
0xFF_FF_FF_FF >>> 32; // overshift
0xFF_FF_FF_FF >>> 123;
0xFF_FF_FF_FF >>> 1024;
0xFF_FF_FF_FF >>> -1; // OK-ish
0xFF_FF_FF_FF >>> -32; // backwards overshift
0xFF_FF_FF_FF >>> -123;
0xFF_FF_FF_FF >>> -1024;

let x = 1;
x <<= 1; // ok
x <<= 32; // overshift
x <<= 123;
x <<= 1024;
x <<= -1; // OK-ish
x <<= -32; // backwards overshift
x <<= -123;
x <<= -1024;

x >>= 1; // ok
x >>= 32; // overshift
x >>= 123;
x >>= 1024;
x >>= -1; // OK-ish
x >>= -32; // backwards overshift
x >>= -123;
x >>= -1024;

x >>>= 1; // ok
x >>>= 32; // overshift
x >>>= 123;
x >>>= 1024;
x >>>= -1; // OK-ish
x >>>= -32; // backwards overshift
x >>>= -123;
x >>>= -1024;

enum One {
    A = 1 << 1, // ok
    B = 1 << 32, // overshift
    C = 1 << 123,
    D = 1 << 1024,
    E = 1 << -1, // OK-ish
    F = 1 << -32, // backwards overshift
    G = 1 << -123,
    H = 1 << -1024,
}

enum Two {
    A = 0xFF_FF_FF_FF >> 1, // ok
    B = 0xFF_FF_FF_FF >> 32, // overshift
    C = 0xFF_FF_FF_FF >> 123,
    D = 0xFF_FF_FF_FF >> 1024,
    E = 0xFF_FF_FF_FF >> -1, // OK-ish
    F = 0xFF_FF_FF_FF >> -32, // backwards overshift
    G = 0xFF_FF_FF_FF >> -123,
    H = 0xFF_FF_FF_FF >> -1024,
}

enum Three {
    A = 0xFF_FF_FF_FF >>> 1, // ok
    B = 0xFF_FF_FF_FF >>> 32, // overshift
    C = 0xFF_FF_FF_FF >>> 123,
    D = 0xFF_FF_FF_FF >>> 1024,
    E = 0xFF_FF_FF_FF >>> -1, // OK-ish
    F = 0xFF_FF_FF_FF >>> -32, // backwards overshift
    G = 0xFF_FF_FF_FF >>> -123,
    H = 0xFF_FF_FF_FF >>> -1024,
}


//// [overshifts.js]
1 << 1; // ok
1 << 32; // overshift
1 << 123;
1 << 1024;
1 << -1; // OK-ish
1 << -32; // backwards overshift
1 << -123;
1 << -1024;
4294967295 >> 1; // ok
4294967295 >> 32; // overshift
4294967295 >> 123;
4294967295 >> 1024;
4294967295 >> -1; // OK-ish
4294967295 >> -32; // backwards overshift
4294967295 >> -123;
4294967295 >> -1024;
4294967295 >>> 1; // ok
4294967295 >>> 32; // overshift
4294967295 >>> 123;
4294967295 >>> 1024;
4294967295 >>> -1; // OK-ish
4294967295 >>> -32; // backwards overshift
4294967295 >>> -123;
4294967295 >>> -1024;
var x = 1;
x <<= 1; // ok
x <<= 32; // overshift
x <<= 123;
x <<= 1024;
x <<= -1; // OK-ish
x <<= -32; // backwards overshift
x <<= -123;
x <<= -1024;
x >>= 1; // ok
x >>= 32; // overshift
x >>= 123;
x >>= 1024;
x >>= -1; // OK-ish
x >>= -32; // backwards overshift
x >>= -123;
x >>= -1024;
x >>>= 1; // ok
x >>>= 32; // overshift
x >>>= 123;
x >>>= 1024;
x >>>= -1; // OK-ish
x >>>= -32; // backwards overshift
x >>>= -123;
x >>>= -1024;
var One;
(function (One) {
    One[One["A"] = 2] = "A";
    One[One["B"] = 1] = "B";
    One[One["C"] = 134217728] = "C";
    One[One["D"] = 1] = "D";
    One[One["E"] = -2147483648] = "E";
    One[One["F"] = 1] = "F";
    One[One["G"] = 32] = "G";
    One[One["H"] = 1] = "H";
})(One || (One = {}));
var Two;
(function (Two) {
    Two[Two["A"] = -1] = "A";
    Two[Two["B"] = -1] = "B";
    Two[Two["C"] = -1] = "C";
    Two[Two["D"] = -1] = "D";
    Two[Two["E"] = -1] = "E";
    Two[Two["F"] = -1] = "F";
    Two[Two["G"] = -1] = "G";
    Two[Two["H"] = -1] = "H";
})(Two || (Two = {}));
var Three;
(function (Three) {
    Three[Three["A"] = 2147483647] = "A";
    Three[Three["B"] = 4294967295] = "B";
    Three[Three["C"] = 31] = "C";
    Three[Three["D"] = 4294967295] = "D";
    Three[Three["E"] = 1] = "E";
    Three[Three["F"] = 4294967295] = "F";
    Three[Three["G"] = 134217727] = "G";
    Three[Three["H"] = 4294967295] = "H";
})(Three || (Three = {}));

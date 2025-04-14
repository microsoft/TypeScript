// @captureSuggestions: true

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

// Must be integer literals.
declare enum E {
    a = 1e3, // ok
    b = 1e25, // ok
    c = 1e-3, // error
    d = 1e-9, // error
    e = 1e0, // ok
    f = 1e+25 // ok
}
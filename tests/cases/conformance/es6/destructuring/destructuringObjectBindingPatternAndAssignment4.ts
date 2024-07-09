const {
    a = 1,
    b = 2,
    c = b, // ok
    d = a, // ok
    e = f, // error
    f = f  // error
} = { } as any;

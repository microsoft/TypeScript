const z = 6;

enum E {
    a,
    b = a,
    c,
    d = f,
    f,
    g = bad,
    h = E.b,
    i = E["b"],
    j = z,
    k = 3,
    l,
    m = (Math.random() > 0.5 ? 1 : 2),
}
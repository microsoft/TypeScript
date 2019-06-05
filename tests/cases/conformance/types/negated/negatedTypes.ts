enum Literal {
    ok = "ok"
}

enum NumLiteral {
    Val
}

function f1(
    notString: not string,
    str: string,
    strlit: "ok",
    strenum: Literal,
    num: number,
    numlit: 0,
    numenum: NumLiteral,
    unknownVal: unknown,
    neverVal: never
) {
    notString = str;        // not ok
    notString = strlit;     // not ok
    notString = strenum;    // not ok
    notString = num;        // ok
    notString = numlit;     // ok
    notString = numenum;    // ok
    notString = unknownVal; // not ok (unknown is all values, includes string)
    notString = neverVal;   // ok (never is empty set of types, doesn't include string)

    str = notString;        // not ok
    strlit = notString;     // not ok
    strenum = notString;    // not ok
    num = notString;        // not ok
    numlit = notString;     // not ok
    numenum = notString;    // not ok
    unknownVal = notString; // ok
    neverVal = notString;   // not ok
}

function f2(
    x: { x },
    y: { y },
    xy: {x, y},
    nx: not typeof x,
    ny: not typeof y,
    nxy: not typeof xy,
    neither: not (typeof x | typeof y),
    notBoth: not (typeof x & typeof y)
) {
    x = y;          // not ok
    x = xy;         // ok
    x = nx;         // not ok
    x = ny;         // not ok
    x = nxy;        // not ok
    x = neither;    // not ok
    x = notBoth;    // not ok

    y = x;          // not ok
    y = xy;         // ok
    y = nx;         // not ok
    y = ny;         // not ok
    y = nxy;        // not ok
    y = neither;    // not ok
    y = notBoth;    // not ok

    xy = x;         // not ok
    xy = y;         // not ok
    xy = nx;        // not ok
    xy = ny;        // not ok
    xy = nxy;       // not ok
    xy = neither;   // not ok
    xy = notBoth;   // not ok

    nx = x;         // not ok
    nx = y;         // not ok
    nx = ny;        // not ok
    nx = nxy;       // not ok
    nx = neither;   // ok
    nx = notBoth;   // not ok

    ny = x;         // not ok
    ny = y;         // not ok
    ny = nx;        // not ok
    ny = nxy;       // not ok
    ny = neither;   // ok
    ny = notBoth;   // not ok

    nxy = x;        // not ok
    nxy = y;        // not ok
    nxy = xy;       // not ok
    nxy = nx;       // ok
    nxy = ny;       // ok
    nxy = neither;  // ok
    nxy = notBoth;  // ok

    neither = x;    // not ok
    neither = y;    // not ok
    neither = xy;   // not ok
    neither = nx;   // not ok
    neither = ny;   // not ok
    neither = nxy;  // not ok
    neither = notBoth; // not ok

    notBoth = x;    // not ok
    notBoth = y;    // not ok
    notBoth = xy;   // not ok
    notBoth = nx;   // ok
    notBoth = ny;   // ok
    notBoth = neither; // ok
}
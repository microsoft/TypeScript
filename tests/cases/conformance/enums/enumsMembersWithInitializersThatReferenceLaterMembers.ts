enum E1 {
    a = c,
    b = 2,
    c = 3,
}

declare enum E2 {
    a = c,
    b = 2,
    c = 3,
}

const enum E3 {
    a = c,
    b = 2,
    c = 3,
}

declare const enum E4 {
    a = c,
    b = 2,
    c = 3,
}

enum E5 {
    a = c,
    b,
    c,
}

declare enum E6 {
    a = c,
    b,
    c,
}

const enum E7 {
    a = c,
    b,
    c,
}

declare const enum E8 {
    a = c,
    b,
    c,
}

enum cycles {
    a = d,
    b = a,
    d,
    c,
    e = e
}

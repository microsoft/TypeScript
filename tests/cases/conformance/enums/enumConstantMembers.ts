// Enum members with no initilizer increment from last valid constant value.
enum E1 {
    a = 1,
    b
}
enum E2 {
    a = - 1,
    b
}
enum E3 {
    a = 0.1,
    b // b is 1.1
}

declare enum E4 {
    a = 1,
    b = -1,
    c = 0.1,
    d, // d is 1.1
    e = invalid,
    f // f is 2.1
}

const enum E5 {
    a = 1,
    b = -1,
    c = 0.1,
    d, // d is 1.1
    e = invalid,
    f // f is 2.1
}

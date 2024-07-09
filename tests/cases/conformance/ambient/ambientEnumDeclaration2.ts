// In ambient enum declarations that specify no const modifier, enum member declarations
// that omit a value are considered computed members (as opposed to having auto- incremented values assigned).

declare enum E {
    a, // E.a
    b, // E.b
}

declare const enum E1 {
    a, // E.a = 0
    b, // E.b = 1
}
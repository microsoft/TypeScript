// @target: esnext
// @strict: true
// @declaration: true

enum E {
    A = 0,
    B = E.A.valueOf(),
    C = 1,
}

const member: Extract<E, 1> = E.C;
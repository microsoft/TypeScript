// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60990

type N0 = number & {
    test: "TEST"
}

type N1 = 3 & {
    test: "TEST"
}

declare let n0: N0
declare let n1: N1

let m0: `${number}` = `${n0}` // ok
let m1: "3" = `${n1}` // ok
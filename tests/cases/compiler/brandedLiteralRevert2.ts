// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60990

type Brand1 = number & 1 & {
    test: "TEST"
}

type Brand2 = "a" & {
    test: "TEST1"
}

let brandN1: Brand1 = 1 as Brand1
let brandN2: Brand2 = "a" as Brand2

let brandM11: `${number}` = `${brandN1}` // ok
let brandM12: "1" = `${brandN1}` // ok
let brandM13: `${1}` = `${brandN1}` // ok

let brandM21: "a" = `${brandN2}` // ok
let brandM22: "1a" = `${brandN1}${brandN2}` // ok

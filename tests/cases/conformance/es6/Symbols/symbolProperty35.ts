//@target: ES6
interface I1 {
    [Symbol.toStringTag](): { x: string }
}
interface I2 {
    [Symbol.toStringTag](): { x: number }
}

interface I3 extends I1, I2 { }
function fn<a>(y: Y, set: (y: Y, x: number) => void): a {
    return undefined;
}
interface Y { x: number }

class C {
    constructor(
        y: Y,
        public x = fn(y, (y, x) => y.x = x) // expected to work, but actually doesn't
    ) {
    }
}
//// [tests/cases/compiler/parameterReferenceInInitializer1.ts] ////

//// [parameterReferenceInInitializer1.ts]
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

//// [parameterReferenceInInitializer1.js]
function fn(y, set) {
    return undefined;
}
class C {
    x;
    constructor(y, x = fn(y, (y, x) => y.x = x)) {
        this.x = x;
    }
}

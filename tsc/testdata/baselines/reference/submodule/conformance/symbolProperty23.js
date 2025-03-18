//// [tests/cases/conformance/es6/Symbols/symbolProperty23.ts] ////

//// [symbolProperty23.ts]
interface I {
    [Symbol.toPrimitive]: () => boolean;
}

class C implements I {
    [Symbol.toPrimitive]() {
        return true;
    }
}

//// [symbolProperty23.js]
class C {
    [Symbol.toPrimitive]() {
        return true;
    }
}

//// [tests/cases/conformance/es6/Symbols/symbolProperty24.ts] ////

//// [symbolProperty24.ts]
interface I {
    [Symbol.toPrimitive]: () => boolean;
}

class C implements I {
    [Symbol.toPrimitive]() {
        return "";
    }
}

//// [symbolProperty24.js]
class C {
    [Symbol.toPrimitive]() {
        return "";
    }
}

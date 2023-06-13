//// [tests/cases/conformance/es6/Symbols/symbolProperty29.ts] ////

//// [symbolProperty29.ts]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
    [s: symbol]: () => { x: string };
}

//// [symbolProperty29.js]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}

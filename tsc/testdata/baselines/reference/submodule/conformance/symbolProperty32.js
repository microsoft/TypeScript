//// [tests/cases/conformance/es6/Symbols/symbolProperty32.ts] ////

//// [symbolProperty32.ts]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 extends C1 {
    [s: symbol]: () => { x: number };
}

//// [symbolProperty32.js]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 extends C1 {
}

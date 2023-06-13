//// [tests/cases/conformance/es6/Symbols/symbolProperty33.ts] ////

//// [symbolProperty33.ts]
class C1 extends C2 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 {
    [s: symbol]: () => { x: string };
}

//// [symbolProperty33.js]
class C1 extends C2 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 {
}

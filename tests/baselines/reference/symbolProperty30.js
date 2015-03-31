//// [symbolProperty30.ts]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
    [s: symbol]: () => { x: number };
}

//// [symbolProperty30.js]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}

//// [symbolProperty34.ts]
class C2 {
    [s: symbol]: () => { x: number };
}
class C1 extends C2 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}

//// [symbolProperty34.js]
class C2 {
}
class C1 extends C2 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}

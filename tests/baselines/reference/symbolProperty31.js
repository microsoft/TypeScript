//// [symbolProperty31.ts]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 extends C1 {
    [s: symbol]: () => { x: string };
}

//// [symbolProperty31.js]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 extends C1 {
}

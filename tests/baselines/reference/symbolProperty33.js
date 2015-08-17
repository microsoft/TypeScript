//// [symbolProperty33.ts]
class C2 {
    [s: symbol]: () => { x: string };
}
class C1 extends C2 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}

//// [symbolProperty33.js]
class C2 {
}
class C1 extends C2 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}

//@target: ES6
class C2 {
    [s: symbol]: () => { x: string };
}
class C1 extends C2 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
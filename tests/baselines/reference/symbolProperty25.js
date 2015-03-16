//// [symbolProperty25.ts]
interface I {
    [Symbol.toPrimitive]: () => boolean;
}

class C implements I {
    [Symbol.toStringTag]() {
        return "";
    }
}

//// [symbolProperty25.js]
class C {
    [Symbol.toStringTag]() {
        return "";
    }
}

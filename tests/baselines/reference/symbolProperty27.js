//// [symbolProperty27.ts]
class C1 {
    [Symbol.toStringTag]() {
        return {};
    }
}

class C2 extends C1 {
    [Symbol.toStringTag]() {
        return "";
    }
}

//// [symbolProperty27.js]
class C1 {
    [Symbol.toStringTag]() {
        return {};
    }
}
class C2 extends C1 {
    [Symbol.toStringTag]() {
        return "";
    }
}

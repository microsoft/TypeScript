//// [symbolProperty46.ts]
class C {
    get [Symbol.hasInstance]() {
        return "";
    }
    // Should take a string
    set [Symbol.hasInstance](x) {
    }
}

(new C)[Symbol.hasInstance] = 0;
(new C)[Symbol.hasInstance] = "";

//// [symbolProperty46.js]
class C {
    get [Symbol.hasInstance]() {
        return "";
    }
    // Should take a string
    set [Symbol.hasInstance](x) {
    }
}
(new C)[Symbol.hasInstance] = 0;
(new C)[Symbol.hasInstance] = "";

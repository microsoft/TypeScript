//// [privateNameComputedPropertyName4.ts]
// https://github.com/microsoft/TypeScript/issues/44113
class C1 {
    static #qux = 42;
    ["bar"] () {}
}
class C2 {
    static #qux = 42;
    static ["bar"] () {}
}
class C3 {
    static #qux = 42;
    static ["bar"] = "test";
}


//// [privateNameComputedPropertyName4.js]
// https://github.com/microsoft/TypeScript/issues/44113
class C1 {
    static #qux = 42;
    ["bar"]() { }
}
class C2 {
    static #qux = 42;
    static ["bar"]() { }
}
class C3 {
    static #qux = 42;
    static ["bar"] = "test";
}

//// [tests/cases/conformance/classes/members/privateNames/privateNameComputedPropertyName4.ts] ////

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
var _a, _C1_qux, _b, _C2_qux, _c, _C3_qux;
// https://github.com/microsoft/TypeScript/issues/44113
class C1 {
    ["bar"]() { }
}
_a = C1;
_C1_qux = { value: 42 };
class C2 {
    static ["bar"]() { }
}
_b = C2;
_C2_qux = { value: 42 };
class C3 {
}
_c = C3;
_C3_qux = { value: 42 };
Object.defineProperty(C3, "bar", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "test"
});

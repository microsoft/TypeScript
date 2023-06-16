//// [tests/cases/compiler/destructuredMaappedTypeIsNotImplicitlyAny.ts] ////

//// [destructuredMaappedTypeIsNotImplicitlyAny.ts]
function foo<T extends string>(key: T, obj: { [_ in T]: number }) {
    const { [key]: bar } = obj; // Element implicitly has an 'any' type because type '{ [_ in T]: number; }' has no index signature.
    bar; // bar : any

    // Note: this does work:
    const lorem = obj[key];
}

//// [destructuredMaappedTypeIsNotImplicitlyAny.js]
function foo(key, obj) {
    var _a = obj, _b = key, bar = _a[_b]; // Element implicitly has an 'any' type because type '{ [_ in T]: number; }' has no index signature.
    bar; // bar : any
    // Note: this does work:
    var lorem = obj[key];
}

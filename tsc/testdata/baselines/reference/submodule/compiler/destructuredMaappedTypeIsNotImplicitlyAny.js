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
    const { [key]: bar } = obj; // Element implicitly has an 'any' type because type '{ [_ in T]: number; }' has no index signature.
    bar; // bar : any
    // Note: this does work:
    const lorem = obj[key];
}

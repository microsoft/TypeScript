// @noImplicitAny: true
function foo<T extends string>(key: T, obj: { [_ in T]: number }) {
    const { [key]: bar } = obj; // Element implicitly has an 'any' type because type '{ [_ in T]: number; }' has no index signature.
    bar; // bar : any

    // Note: this does work:
    const lorem = obj[key];
}
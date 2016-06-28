//// [unionTypeParameterInference.ts]
// Regression test for #5861

interface Foo<T> { prop: T; }

declare function lift<U>(value: U | Foo<U>): Foo<U>;

function unlift<U>(value: U | Foo<U>): U {
    return lift(value).prop;
}


//// [unionTypeParameterInference.js]
// Regression test for #5861
function unlift(value) {
    return lift(value).prop;
}

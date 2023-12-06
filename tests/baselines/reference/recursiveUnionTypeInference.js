//// [tests/cases/compiler/recursiveUnionTypeInference.ts] ////

//// [recursiveUnionTypeInference.ts]
interface Foo<T> {
    x: T;
}

function bar<T>(x: Foo<T> | string): T {
    return bar(x);
}


//// [recursiveUnionTypeInference.js]
function bar(x) {
    return bar(x);
}

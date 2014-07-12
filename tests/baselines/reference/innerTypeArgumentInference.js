//// [innerTypeArgumentInference.ts]
interface Generator<T> { (): T; }
function Generate<U>(func: Generator<U>): U {
    return Generate(func);
}

//// [innerTypeArgumentInference.js]
function Generate(func) {
    return Generate(func);
}

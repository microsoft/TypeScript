//// [recursiveGenericMethodCall.ts]
interface Generator<T> { (): T; }

function Generate<T>(func: Generator<T>): T {
    return Generate(func);
}


//// [recursiveGenericMethodCall.js]
function Generate(func) {
    return Generate(func);
}

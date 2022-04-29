interface Generator<T> { (): T; }
function Generate<U>(func: Generator<U>): U {
    return Generate(func);
}
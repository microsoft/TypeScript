interface Generator<T> { (): T; }

function Generate<T>(func: Generator<T>): T {
    return Generate(func);
}

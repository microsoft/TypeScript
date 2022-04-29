function f<T, U extends { a: T }>() {
    return undefined;
}
f<string, { a: number }>(); // should error


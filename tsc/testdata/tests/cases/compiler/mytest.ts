// @strict: true

function* bbool<T extends true | false>(x: T) {
    yield 3;
    if (x) {
        return 1;
    }
    return 2;
}

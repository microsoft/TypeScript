function f<T extends { q: (p1: number) => number }>(p: T): T {
    return p;
}

var v = f({ q: x => x });
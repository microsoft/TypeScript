function f<T extends { "0": (p1: number) => number }>(p: T): T {
    return p;
}

var v = f([x => x]);
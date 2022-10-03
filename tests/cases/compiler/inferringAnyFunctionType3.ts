function f<T extends ((p1: number) => number)[]>(p: T): T {
    return p;
}

var v = f([x => x]);
function foo<T extends { m(p: string): number }>(x: T): T {
    return undefined;
}

foo({ m(x) { return x.length } });
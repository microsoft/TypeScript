function foo<T extends (p: string) => number>(x: T): T {
    return undefined;
}

foo(x => x.length);
function foo<A extends any[]>(
    arg: <T extends { a: number }>(t: T, ...rest: A) => number
) { }

foo((t, u: number) => t.a)
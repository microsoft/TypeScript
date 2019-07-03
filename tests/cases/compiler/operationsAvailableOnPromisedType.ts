function fn(
    a: number,
    b: Promise<number>,
    c: Promise<string[]>,
    d: Promise<{ prop: string }>,
    e: Promise<() => void>,
    f: Promise<() => void> | (() => void),
    g: Promise<{ new(): any }>
) {
    // All errors
    a | b;
    b | a;
    a + b;
    a > b;
    b++;
    --b;
    a === b;
    for (const s of c) {
        fn(b, b, c, d);
        d.prop;
    }
    e();
    f();
    new g();
}

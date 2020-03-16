async function fn(
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
    [...c];
    for (const s of c) {
        fn(b, b, c, d, e, f, g);
        d.prop;
    }
    for await (const s of c) {}
    e();
    f();
    new g();
    b();
}

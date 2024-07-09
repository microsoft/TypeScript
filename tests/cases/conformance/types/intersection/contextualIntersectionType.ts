var x: { a: (s: string) => string } & { b: (n: number) => number };
x = {
    a: s => s,
    b: n => n
};

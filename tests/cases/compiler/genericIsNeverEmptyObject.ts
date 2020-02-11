// @strict: true

// Repro from #29067

function test<T extends { a: string }>(obj: T) {
    let { a, ...rest } = obj;
    return { ...rest, b: a };
}

let o1 = { a: 'hello', x: 42 };
let o2: { b: string, x: number } = test(o1);

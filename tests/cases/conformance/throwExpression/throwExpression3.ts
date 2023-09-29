function t1(foo: number) {
    const a = foo === 1 ? 1 : throw new Error("Unexpected value");
}

function t2(foo: number) {
    const a = foo === 1 ? throw new Error("Unexpected value") : 1;
}

function t3(foo: number | undefined) {
    const a = foo ?? throw new Error("Unexpected value");
}

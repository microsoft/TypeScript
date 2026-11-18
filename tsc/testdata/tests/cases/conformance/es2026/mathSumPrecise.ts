// @target: es2026
// @noEmit: true
// @strict: true

const arraySum: number = Math.sumPrecise([1, 2, 3]);
const setSum: number = Math.sumPrecise(new Set([0.1, 0.2]));

function* numbers(): Generator<number, void, unknown> {
    yield 1;
    yield 2;
}

const generatorSum: number = Math.sumPrecise(numbers());

Math.sumPrecise([1n, 2n]);

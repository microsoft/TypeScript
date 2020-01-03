// @strict: true
// @target: esnext
const mul = (a: number, b: number) => a * b;

const left = mul(?, 2);
const right = mul(2, ?);
const both = mul(?, ?);

left(3);
right(4);
both(5, 6);

left.length == 1;
left.name == 'left';

const mulSubtract = (a:number, b:number, c:number) => mul(a, b) - c;

const middle = mulSubtract(5, ?, 1);
const sides = mulSubtract(?, 10, ?);

middle(2);
sides(4, 3);

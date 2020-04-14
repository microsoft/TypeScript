let x = 1;
const add = (a: number, b: number) => a + b;
const add1 = add(x, ?);

x = 2;

add1(2) === 3;

let mutAdd = (a: number, b: number) => a + b;
const mutAdd2 = mutAdd(2, ?);

mutAdd2(5) === 7;

mutAdd = (a: number, b: number) => a - b;

mutAdd2(7) === 9;
mutAdd(2, 7) === -5;

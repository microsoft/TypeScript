let y = 2;
const square = Math.pow(?, y);
const num: number = square(5);
y = 3;
console.log(square(4));

function simple(a) { return a; };
const simplePartial = simple(?);

const addMulSub = (a: number, b: number, c: number, d: number) => (a + b) * c - d;
const f = addMulSub(?, 100, ?, ?);
console.log(f(1, 2, 3));
console.log(addMulSub(1, 100, 2, 3));
const f2 = addMulSub(?, 100, Math.random(), ?);
console.log(f2(1, 2));
console.log(f2(1, 2));
console.log(addMulSub(1, 100, 50, 2));

// const fiveSquared = square(5);

// const cube = (a) => Math.pow(a, 3);
// const fourCubed = cube(4);

// const add = (a, b) => a + b;
// const add5 = add(?, 3);


// console.log(10 |> add5);
// console.log(20 |> add(?, 2));

// afterWait();

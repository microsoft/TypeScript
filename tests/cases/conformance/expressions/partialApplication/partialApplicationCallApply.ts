const addC = (a, b) => a + b;

const addOne = addC~(1, ?);

[1, 2, 3].map(addOne).forEach(console.log);
// prints:
// 2 0 2,3,4
// 3 1 2,3,4
// 4 2 2,3,4

[1, 2, 3].map(addOne).forEach(console.log~(?));
// prints:
// 2
// 3
// 4

const f = (a, b, c) => [a, b, c];

const fI = f~(?, 1, ?);

const g = f~(?, 1, ?).apply~(null, ?);

console.log(g([4, 5, 6]));
// prints:
// 4,1,5

function whoAmI() {
    console.log(`I'm ${this.name}`);
}

const w = whoAmI.call~(?);
w({ name: "Alice" }); // prints: I'm Alice
w({ name: "Bob" }); // prints: I'm Bob

var m = 5 & ~(1 | 4);
var a = ~(1 | 4);
var b = ~(1);

// @strict: true
let x: number;
x = Math.random();
let a: number;
try {
    if (x) {
        a = 1;
    } else {
        a = 2;
    }
} finally {
    console.log(x);
}

console.log(a); // <- error here
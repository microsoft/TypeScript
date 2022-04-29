// @allowUnreachableCode: true
// @module: system

export var x;
x = 1;
x++;
x--;
++x;
--x;
x += 1;
x -= 1;
x *= 1;
x /= 1;
x |= 1;
x &= 1;
x + 1;
x - 1;
x & 1;
x | 1;
for (x = 5;;x++) {}
for (x = 8;;x--) {}
for (x = 15;;++x) {}
for (x = 18;;--x) {}

for (let x = 50;;) {}
function foo() {
    x = 100;
}

export let [y] = [1];
export const {a: z0, b: {c: z1}} = {a: true, b: {c: "123"}};
for ([x] of [[1]]) {}
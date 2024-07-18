// @target: es5

const fns = [];
for (const value of [1, 2, 3]) {
    fns.push(() => ({ value }));
}
const result = fns.map(fn => fn());
console.log(result)

// @module: commonjs
// @target: es2015

export function f(xs: number[]) {
    for (const x of xs) {
        const mount = x;
        console.log(mount);
    }
    for (const x in xs) {
        const mount = x;
        console.log(mount);
    }
    for (let x = 0; x < xs.length; x++) {
        const mount = xs[x];
        console.log(mount);
    }
}
function mount() {}
export { mount };

for (const x of [1]) {
    var fromForOf = x;
}
for (const x in [1]) {
    var fromForIn = x;
}
for (let x = 0; x < 1; x++) {
    var fromFor = x;
}
export { fromForOf, fromForIn, fromFor };

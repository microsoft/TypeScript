// @target: es2015
// @module: commonjs
let x = 1;

export function foo(y: number) {
    if (y <= x++) return y <= x++;
    if (y <= x--) return y <= x--;
    if (y <= ++x) return y <= ++x;
    if (y <= --x) return y <= --x;

    x++;
    x--;
    ++x;
    --x;
}

export { x };

export let x1 = 0;
export { x1 as y1, x1 as default, x1 as "a b" };

export function f1() {
    return x1++;
}

export function f2() {
    return x1--;
}

x1++;
x1--;

for (let i = 0; i < 2; x1++) {
    i++;
}

export const f3 = () => x1++;

export var x2 = 0;
export { x2 as y2 };

x2++;
export const f4 = () => x2--;

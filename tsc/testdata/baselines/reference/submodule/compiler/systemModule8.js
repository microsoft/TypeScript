//// [tests/cases/compiler/systemModule8.ts] ////

//// [systemModule8.ts]
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

//// [systemModule8.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z1 = exports.z0 = exports.y = exports.x = void 0;
exports.x = 1;
exports.x++;
exports.x--;
++exports.x;
--exports.x;
exports.x += 1;
exports.x -= 1;
exports.x *= 1;
exports.x /= 1;
exports.x |= 1;
exports.x &= 1;
exports.x + 1;
exports.x - 1;
exports.x & 1;
exports.x | 1;
for (exports.x = 5;; exports.x++) { }
for (exports.x = 8;; exports.x--) { }
for (exports.x = 15;; ++exports.x) { }
for (exports.x = 18;; --exports.x) { }
for (let x = 50;;) { }
function foo() {
    exports.x = 100;
}
[exports.y] = [1];
({ a: exports.z0, b: { c: exports.z1 } } = { a: true, b: { c: "123" } });
for ([exports.x] of [[1]]) { }

//// [tests/cases/compiler/commonjsExportShadowedInFunctionLoop.ts] ////

//// [commonjsExportShadowedInFunctionLoop.ts]
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


//// [commonjsExportShadowedInFunctionLoop.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFor = exports.fromForIn = exports.fromForOf = void 0;
exports.f = f;
exports.mount = mount;
function f(xs) {
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
function mount() { }
for (const x of [1]) {
    var fromForOf = x;
    exports.fromForOf = fromForOf;
}
for (const x in [1]) {
    var fromForIn = x;
    exports.fromForIn = fromForIn;
}
for (let x = 0; x < 1; x++) {
    var fromFor = x;
    exports.fromFor = fromFor;
}

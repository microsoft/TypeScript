//// [tests/cases/conformance/types/rest/objectRestForOf.ts] ////

//// [objectRestForOf.ts]
let array: { x: number, y: string }[];
for (let { x, ...restOf } of array) {
    [x, restOf];
}
let xx: number;
let rrestOff: { y: string };
for ({ x: xx, ...rrestOff } of array ) {
    [xx, rrestOff];
}
for (const norest of array.map(a => ({ ...a, x: 'a string' }))) {
    [norest.x, norest.y];
    // x is now a string. who knows why.
}


//// [objectRestForOf.js]
let array;
for (let { x, ...restOf } of array) {
    [x, restOf];
}
let xx;
let rrestOff;
for ({ x: xx, ...rrestOff } of array) {
    [xx, rrestOff];
}
for (const norest of array.map(a => ({ ...a, x: 'a string' }))) {
    [norest.x, norest.y];
    // x is now a string. who knows why.
}

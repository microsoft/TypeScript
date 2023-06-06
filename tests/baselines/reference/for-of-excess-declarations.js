//// [for-of-excess-declarations.ts]
for (const a, { [b]: c} of [1]) {

}

//// [for-of-excess-declarations.js]
for (const a, { [b]: c } of [1]) {
}

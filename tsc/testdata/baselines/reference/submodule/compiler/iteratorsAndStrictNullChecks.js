//// [tests/cases/compiler/iteratorsAndStrictNullChecks.ts] ////

//// [iteratorsAndStrictNullChecks.ts]
// for..of
for (const x of ["a", "b"]) {
    x.substring;
}

// Spread
const xs = [1, 2, 3];
const ys = [4, 5];
xs.push(...ys);


//// [iteratorsAndStrictNullChecks.js]
for (const x of ["a", "b"]) {
    x.substring;
}
const xs = [1, 2, 3];
const ys = [4, 5];
xs.push(...ys);

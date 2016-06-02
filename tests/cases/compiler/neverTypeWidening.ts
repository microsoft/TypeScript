// @strictNullChecks: true

let a = [];                     // never[] widens to any[]
let b = [...[], ...[]];         // never[] widens to any[]
let c = [...[...[]]];           // never[] widens to any[]
let d = [...[], ...[1, 2, 3]];  // number[]
let e = [1, 2, 3].concat([]);   // number[]

// Repro from #8878

function concat<T>(xs: T[], ys: T[]): T[] {
    return [...xs, ...ys];
}
const y = concat([], ["a"]);
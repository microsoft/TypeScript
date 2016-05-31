//// [neverTypeWidening.ts]

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

//// [neverTypeWidening.js]
var a = []; // never[] widens to any[]
var b = [].concat([]); // never[] widens to any[]
var c = []; // never[] widens to any[]
var d = [].concat([1, 2, 3]); // number[]
var e = [1, 2, 3].concat([]); // number[]
// Repro from #8878
function concat(xs, ys) {
    return xs.concat(ys);
}
var y = concat([], ["a"]);

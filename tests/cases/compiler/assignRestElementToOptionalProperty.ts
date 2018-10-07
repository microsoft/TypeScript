// Inspired by #27144

let t: [number, ...string[]];
// Error, rest type of `t` does not match element 1 of `t2`
let t2: [number, number?, ...string[]] = t;
// OK
let t3: [number, string?, ...string[]] = t;

// @strictNullChecks: true
const a: { x?: number } = { };
let x = 0;
({x = 1} = a);

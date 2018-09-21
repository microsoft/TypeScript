//// [literalFreshnessNarrowing.ts]
type XY = 'x' | 'y';
const x: XY = 'x';
let x2 = x;  // Shouldn't have type string

const y: boolean = true;
let y2 = y;  // Shouldn't type boolean


//// [literalFreshnessNarrowing.js]
var x = 'x';
var x2 = x; // Shouldn't have type string
var y = true;
var y2 = y; // Shouldn't type boolean

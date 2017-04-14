//// [intersectionsAndEmptyObjects.ts]
// Empty object type literals are removed from intersections types
// that contain other object types

type A = { a: number };
type B = { b: string };
type C = {};

let x01: A & B;
let x02: A & C;
let x03: B & C;
let x04: A & B & C;
let x05: string & C;
let x06: C & string;
let x07: C;
let x08: C & {};
let x09: {} & A & {} & B & {} & C & {};

interface D {}
interface E {}

let x10: A & D;
let x11: C & D;
let x12: A & B & C & D;
let x13: D & E;
let x14: A & B & C & D & E;


//// [intersectionsAndEmptyObjects.js]
// Empty object type literals are removed from intersections types
// that contain other object types
var x01;
var x02;
var x03;
var x04;
var x05;
var x06;
var x07;
var x08;
var x09;
var x10;
var x11;
var x12;
var x13;
var x14;

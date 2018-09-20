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

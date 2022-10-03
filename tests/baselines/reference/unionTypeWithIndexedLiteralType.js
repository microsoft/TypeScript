//// [unionTypeWithIndexedLiteralType.ts]
interface I { x: number; }
interface Idx { [index: string]: U; }
type U = Idx | I | "lit";
const u: U = { x: "lit" };

//// [unionTypeWithIndexedLiteralType.js]
var u = { x: "lit" };

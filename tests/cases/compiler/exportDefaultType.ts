// @strict: true

// @filename: a.ts
export default type A = number;

// @filename: b.ts
import A from "./a"
let a: A;

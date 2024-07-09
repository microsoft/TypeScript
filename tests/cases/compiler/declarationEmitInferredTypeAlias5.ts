// @declaration: true
// @skipDefaultLibCheck: true

// @Filename: 0.ts
export type Data = string | boolean;
let obj: Data = true;

// @Filename: 1.ts
import * as Z from "./0"
//let v2: Z.Data;
let v = "str" || true;
export { v }
// @module: commonjs
// @target: es5

// @filename: t1.ts
let set = {
    set foo(x: number) {
    }
}
let get = 10;

export { set, get };

// @filename: t2.ts 
import * as set from "./t1";

// @filename: t3.ts 
import { set as yield } from "./t1";

// @filename: t4.ts 
import { get } from "./t1";
// @module: commonjs

// @filename: a.ts
var undefined;
export { undefined };

// @filename: b.ts
import { undefined } from "./a";
declare function use(a: number);
use(undefined);
// @module: commonjs
// @target: es5, es2015
// @esModuleInterop: true
// @filename: fs.d.ts
export const x: number;
// @filename: mjts.ts
import * as fs from "./fs";

fs;

export * from "./fs";
export {x} from "./fs";
export {x as y} from "./fs";

// @esModuleInterop: true
// @target: es3,es5
// @filename: fs.d.ts
export const x: number;
// @filename: mjts.ts
import * as fs from "./fs";

fs;

export * from "./fs";
export {x} from "./fs";
export {x as y} from "./fs";

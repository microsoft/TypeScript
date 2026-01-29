//// [tests/cases/compiler/esModuleInteropWithExportStar.ts] ////

//// [fs.d.ts]
export const x: number;
//// [mjts.ts]
import * as fs from "./fs";

fs;

export * from "./fs";
export {x} from "./fs";
export {x as y} from "./fs";


//// [mjts.js]
import * as fs from "./fs";
fs;
export * from "./fs";
export { x } from "./fs";
export { x as y } from "./fs";

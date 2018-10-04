// @esModuleInterop: true
// @filename: hybrid/index.d.ts
export function sayHello(): string;
// @filename: path.d.ts
declare const anything: any;
export = anything;
// @filename: fs.d.ts
declare const anything: any;
export = anything;
// @filename: mjts.ts
import { sayHello } from "./hybrid";
import path from "./path";
import * as fs from "./fs";

path;
sayHello();
fs;

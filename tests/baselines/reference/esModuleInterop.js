//// [tests/cases/compiler/esModuleInterop.ts] ////

//// [index.d.ts]
export function sayHello(): string;
//// [path.d.ts]
declare const anything: any;
export = anything;
//// [fs.d.ts]
declare const anything: any;
export = anything;
//// [mjts.ts]
import { sayHello } from "./hybrid";
import path from "./path";
import * as fs from "./fs";

path;
sayHello();
fs;


//// [mjts.js]
import { sayHello } from "./hybrid";
import path from "./path";
import * as fs from "./fs";
path;
sayHello();
fs;

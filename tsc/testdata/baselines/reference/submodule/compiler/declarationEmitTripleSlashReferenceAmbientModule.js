//// [tests/cases/compiler/declarationEmitTripleSlashReferenceAmbientModule.ts] ////

//// [index.d.ts]
declare module "url" {
  export class Url {}
  export function parse(): Url; 
}

//// [usage1.ts]
export { parse } from "url";

//// [usage2.ts]
import { parse } from "url";
export const thing: import("url").Url = parse(); 

//// [usage3.ts]
import { parse } from "url";
export const thing = parse();


//// [usage1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const url_1 = require("url");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return url_1.parse; } });
//// [usage2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thing = void 0;
const url_1 = require("url");
exports.thing = (0, url_1.parse)();
//// [usage3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thing = void 0;
const url_1 = require("url");
exports.thing = (0, url_1.parse)();

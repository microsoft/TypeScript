//// [tests/cases/compiler/hybridModuleEmitNoImportEqualsErrorCjsResolution.ts] ////

//// [index.d.ts]
declare function f(): void;
export = f;
//// [esmyexporter.ts]
const x = 0;
const y = 0;
export {x, y}
//// [importer.ts]
import f = require("cjsyexporter");
f();

import {x, y} from "./esmyexporter";
void x;
void y;


//// [esmyexporter.js]
const x = 0;
const y = 0;
export { x, y };
//// [importer.js]
const f = require("cjsyexporter");
f();
import { x, y } from "./esmyexporter";
void x;
void y;

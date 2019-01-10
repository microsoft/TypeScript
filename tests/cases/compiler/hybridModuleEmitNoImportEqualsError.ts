// @target: es6
// @module: hybrid
// @filename: cjsyexporter.ts
function f(): void {}
export = f;
// @filename: esmyexporter.ts
const x = 0;
const y = 0;
export {x, y}
// @filename: importer.ts
import f = require("./cjsyexporter");
f();

import {x, y} from "./esmyexporter";
void x;
void y;

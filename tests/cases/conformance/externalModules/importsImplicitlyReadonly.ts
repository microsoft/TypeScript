// @module: commonjs

// @filename: a.ts
export var x = 1;
var y = 1;
export { y };

// @filename: b.ts
import { x, y } from "./a";
import * as a1 from "./a";
import a2 = require("./a");
const a3 = a1;

x = 1;     // Error
y = 1;     // Error
a1.x = 1;  // Error
a1.y = 1;  // Error
a2.x = 1;
a2.y = 1;
a3.x = 1;
a3.y = 1;
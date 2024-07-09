//// [tests/cases/conformance/externalModules/importTsBeforeDTs.ts] ////

//// [foo_0.d.ts]
export var x: number = 42;

//// [foo_0.ts]
export var y: number = 42;


//// [foo_1.ts]
import foo = require("./foo_0");
var z1 = foo.x + 10;   // Should error, as .ts preferred over .d.ts
var z2 = foo.y + 10; // Should resolve


//// [foo_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 42;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo = require("./foo_0");
var z1 = foo.x + 10; // Should error, as .ts preferred over .d.ts
var z2 = foo.y + 10; // Should resolve

//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxNoElisionCJS.ts] ////

//// [a.ts]
interface I {}
export = I;

//// [b.ts]
import I = require("./a");

//// [c.ts]
interface I {}
namespace I {
    export const x = 1;
}
export = I;

//// [d.ts]
import I = require("./c");
import type J = require("./c");
export = J;

//// [e.d.ts]
interface I {}
export = I;

//// [f.ts]
import type I = require("./e");
const I = {};
export = I;

//// [z.ts]
// test harness is weird if the last file includs a require >:(

//// [a.js]
"use strict";
module.exports = I;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const I = require("./a");
//// [c.js]
"use strict";
var I;
(function (I) {
    I.x = 1;
})(I || (I = {}));
module.exports = I;
//// [d.js]
"use strict";
const I = require("./c");
module.exports = J;
//// [f.js]
"use strict";
const I = {};
module.exports = I;
//// [z.js]
// test harness is weird if the last file includs a require >:(

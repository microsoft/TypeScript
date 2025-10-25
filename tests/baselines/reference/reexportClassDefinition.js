//// [tests/cases/conformance/externalModules/reexportClassDefinition.ts] ////

//// [foo1.ts]
class x{}
export = x; 

//// [foo2.ts]
import foo1 = require('./foo1');

export = {
    x: foo1
}

//// [foo3.ts]
import foo2 = require('./foo2')
class x extends foo2.x {}



//// [foo1.js]
"use strict";
class x {
}
module.exports = x;
//// [foo2.js]
"use strict";
const foo1 = require("./foo1");
module.exports = {
    x: foo1
};
//// [foo3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo2 = require("./foo2");
class x extends foo2.x {
}

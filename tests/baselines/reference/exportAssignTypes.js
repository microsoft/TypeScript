//// [tests/cases/conformance/externalModules/exportAssignTypes.ts] ////

//// [expString.ts]
var x = "test";
export = x;

//// [expNumber.ts]
var x = 42;
export = x;

//// [expBoolean.ts]
var x = true;
export = x;

//// [expArray.ts]
var x = [1,2];
export = x;

//// [expObject.ts]
var x = { answer: 42, when: 1776};
export = x;

//// [expAny.ts]
var x;
export = x;

//// [expGeneric.ts]
function x<T>(a: T){
	return a;
}
export = x;

//// [consumer.ts]
import iString = require('./expString');
var v1: string = iString;

import iNumber = require('./expNumber');
var v2: number = iNumber;

import iBoolean = require('./expBoolean');
var v3: boolean = iBoolean;

import iArray = require('./expArray');
var v4: Array<number> = iArray;

import iObject = require('./expObject');
var v5: Object = iObject;

import iAny = require('./expAny');
var v6 = iAny;

import iGeneric = require('./expGeneric');
var v7: {<x>(p1: x): x} = iGeneric;


//// [expString.js]
"use strict";
var x = "test";
module.exports = x;
//// [expNumber.js]
"use strict";
var x = 42;
module.exports = x;
//// [expBoolean.js]
"use strict";
var x = true;
module.exports = x;
//// [expArray.js]
"use strict";
var x = [1, 2];
module.exports = x;
//// [expObject.js]
"use strict";
var x = { answer: 42, when: 1776 };
module.exports = x;
//// [expAny.js]
"use strict";
var x;
module.exports = x;
//// [expGeneric.js]
"use strict";
function x(a) {
    return a;
}
module.exports = x;
//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iString = require("./expString");
var v1 = iString;
const iNumber = require("./expNumber");
var v2 = iNumber;
const iBoolean = require("./expBoolean");
var v3 = iBoolean;
const iArray = require("./expArray");
var v4 = iArray;
const iObject = require("./expObject");
var v5 = iObject;
const iAny = require("./expAny");
var v6 = iAny;
const iGeneric = require("./expGeneric");
var v7 = iGeneric;

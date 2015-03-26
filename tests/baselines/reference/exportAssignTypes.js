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
var x = "test";
module.exports = x;
//// [expNumber.js]
var x = 42;
module.exports = x;
//// [expBoolean.js]
var x = true;
module.exports = x;
//// [expArray.js]
var x = [1, 2];
module.exports = x;
//// [expObject.js]
var x = { answer: 42, when: 1776 };
module.exports = x;
//// [expAny.js]
var x;
module.exports = x;
//// [expGeneric.js]
function x(a) {
    return a;
}
module.exports = x;
//// [consumer.js]
var iString = require('./expString');
var v1 = iString;
var iNumber = require('./expNumber');
var v2 = iNumber;
var iBoolean = require('./expBoolean');
var v3 = iBoolean;
var iArray = require('./expArray');
var v4 = iArray;
var iObject = require('./expObject');
var v5 = iObject;
var iAny = require('./expAny');
var v6 = iAny;
var iGeneric = require('./expGeneric');
var v7 = iGeneric;

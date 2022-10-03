// @Filename: expString.ts
var x = "test";
export = x;

// @Filename: expNumber.ts
var x = 42;
export = x;

// @Filename: expBoolean.ts
var x = true;
export = x;

// @Filename: expArray.ts
var x = [1,2];
export = x;

// @Filename: expObject.ts
var x = { answer: 42, when: 1776};
export = x;

// @Filename: expAny.ts
var x;
export = x;

// @Filename: expGeneric.ts
function x<T>(a: T){
	return a;
}
export = x;

// @Filename: consumer.ts
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

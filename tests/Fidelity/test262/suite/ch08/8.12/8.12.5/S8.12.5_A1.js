// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Put]] method of O is called with property P and value V,
 * and If O doesn't have a property with name P, then
 * creates a property with name P, set its value to V and give it empty attributes
 *
 * @path ch08/8.12/8.12.5/S8.12.5_A1.js
 * @description Put to not existent properties
 */

var __map={}; __map[1]="one"; __map["two"]=2; __map["3"]="tre";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__map[1] !== "one") {
	$ERROR('#1: var __map={}; __map[1]="one"; __map["two"]=2; __map["3"]="tre"; __map[1] === "one". Actual: ' + (__map[1]));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__map["two"] !== 2) {
	$ERROR('#2: var __map={}; __map[1]="one"; __map["two"]=2; __map["3"]="tre"; __map["two"] === 2. Actual: ' + (__map["two"]));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__map["3"] !== "tre") {
	$ERROR('#3: var __map={}; __map[1]="one"; __map["two"]=2; __map["3"]="tre"; __map["3"] === "tre". Actual: ' + (__map["3"]));
}
//
//////////////////////////////////////////////////////////////////////////////


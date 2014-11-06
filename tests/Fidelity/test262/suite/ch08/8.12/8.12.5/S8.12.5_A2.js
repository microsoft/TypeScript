// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Put]] method of O is called with property P and value V,
 * then set the value of the property to V. The attributes of the property are not changed
 *
 * @path ch08/8.12/8.12.5/S8.12.5_A2.js
 * @description Put to existent properties
 */

var _map={1:"one",two:2};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
_map[1]="uno";
if (_map[1] !== "uno") {
  $ERROR('#1: var _map={1:"one",two:2}; _map[1]="uno"; _map[1] === "uno". Actual: ' + (_map[1]));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
_map["1"]=1;
if (_map[1] !== 1) {
  $ERROR('#2: var _map={1:"one",two:2}; _map[1]="uno"; _map["1"]=1; _map[1] === 1. Actual: ' + (_map[1]));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
_map["two"]="two";
if (_map["two"] !== "two") {
  $ERROR('#3: var _map={1:"one",two:2}; _map[1]="uno"; _map["1"]=1; _map["two"]="two"; _map["two"] === "two". Actual: ' + (_map["two"]));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
_map.two="duo";
if (_map.two !== "duo") {
  $ERROR('#4: var _map={1:"one",two:2}; _map[1]="uno"; _map["1"]=1; _map["two"]="two"; _map.two="duo"; _map.two === "duo". Actual: ' + (_map.two));
}
//
//////////////////////////////////////////////////////////////////////////////


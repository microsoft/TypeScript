// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.slice (start, end) can be applied to object instances
 *
 * @path ch15/15.5/15.5.4/15.5.4.13/S15.5.4.13_A3_T4.js
 * @description Checknig if applying String.prototype.slice to Function object instance passes
 */

__FACTORY.prototype.toString = function() { return this.value+''; };

var __instance = new __FACTORY(void 0);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.slice(0,100) !== "undefined") {
  $ERROR('#1: __instance.slice(0,100) === "undefined". Actual: '+__instance.slice(0,100) );
}
//
//////////////////////////////////////////////////////////////////////////////

function __FACTORY( value ) {
    this.value = value,
    this.slice= String.prototype.slice;
    //this.substring = String.prototype.substring;
}


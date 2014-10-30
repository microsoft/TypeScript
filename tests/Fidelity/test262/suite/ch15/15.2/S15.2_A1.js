// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Object is the property of global
 *
 * @path ch15/15.2/S15.2_A1.js
 * @description Checking if Object equals to this.Object
 */

var obj=Object;

var thisobj=this.Object;

if(obj!==thisobj){
  $ERROR('Object is the property of global');
}


// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the hasOwnProperty method is called with argument V, the following steps are taken:
 * i) Let O be this object
 * ii) Call ToString(V)
 * iii) If O doesn't have a property with the name given by Result(ii), return false
 * iv) Return true
 *
 * @path ch15/15.2/15.2.4/15.2.4.5/S15.2.4.5_A1_T1.js
 * @description Checking type of the Object.prototype.hasOwnProperty and the returned result
 */

//CHECK#1
if (typeof Object.prototype.hasOwnProperty !== "function") {
  $ERROR('#1: hasOwnProperty method is defined');
}

//CHECK#2
if (!(Object.prototype.hasOwnProperty("hasOwnProperty"))) {
  $ERROR('#2: hasOwnProperty method works properly');
}
//


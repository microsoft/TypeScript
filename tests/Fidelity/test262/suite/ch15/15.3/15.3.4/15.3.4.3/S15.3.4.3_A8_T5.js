// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function.prototype.apply can`t be used as [[create]] caller
 *
 * @path ch15/15.3/15.3.4/15.3.4.3/S15.3.4.3_A8_T5.js
 * @description Checking if creating "new Function("this.p1=1").apply" fails
 */

try {
  FACTORY = Function("this.p1=1").apply;
  obj = new FACTORY();
  $ERROR('#1: Function.prototype.apply can\'t be used as [[create]] caller');
} catch (e) {
  if (!(e instanceof TypeError)) {
  	$ERROR('#1.1: Function.prototype.apply can\'t be used as [[create]] caller');
  }
}


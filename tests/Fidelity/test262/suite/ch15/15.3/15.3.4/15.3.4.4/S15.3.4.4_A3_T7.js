// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If thisArg is null or undefined, the called function is passed the global object as the this value
 *
 * @path ch15/15.3/15.3.4/15.3.4.4/S15.3.4.4_A3_T7.js
 * @description Argument at call function is void 0 and it called inside function declaration
 */

(function FACTORY(){
  Function("this.feat=\"in da haus\"").call(void 0);
})();


//CHECK#1
if (this["feat"] !== "in da haus") {
  $ERROR('#1: If thisArg is null or undefined, the called function is passed the global object as the this value');
}


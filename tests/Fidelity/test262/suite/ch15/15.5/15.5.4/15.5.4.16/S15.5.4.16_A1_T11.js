// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLowerCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.16/S15.5.4.16_A1_T11.js
 * @description Override toString function, toString throw exception, then call toLowerCase() function for this object
 */

var __obj = {toString:function(){throw "intostr";}}
__obj.toLowerCase = String.prototype.toLowerCase;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
  var x = __obj.toLowerCase();
   	$FAIL('#1: "var x = __obj.toLowerCase()" lead to throwing exception');
} catch (e) {
  if (e!=="intostr") {
    $ERROR('#1.1: Exception === "intostr". Actual: '+e);
  }
}
//
//////////////////////////////////////////////////////////////////////////////


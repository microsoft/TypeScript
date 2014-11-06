// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "try" with "catch" or "finally" statement within/without a "for-in" statement
 *
 * @path ch12/12.14/S12.14_A12_T1.js
 * @description Loop inside try Block, where throw exception
 */

var x;
var mycars = new Array();
mycars[0] = "Saab";
mycars[1] = "Volvo";
mycars[2] = "BMW";

// CHECK#1
try{
  for (x in mycars){
    if (mycars[x]==="BMW") throw "ex";
  }
}
catch(e){
  if(e!=="ex")$ERROR('#1: Exception ==="ex". Actual:  Exception ==='+ e  );
}




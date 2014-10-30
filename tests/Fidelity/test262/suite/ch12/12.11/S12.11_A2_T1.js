// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * There can be only one DefaultClause
 *
 * @path ch12/12.11/S12.11_A2_T1.js
 * @description Duplicate DefaultClause
 * @negative
 */

function SwitchTest(value){
  var result = 0;
  
  switch(value) {
    case 0:
      result += 2;
    default:
      result += 32;
      break;
    default:
      result += 32;
      break;
  }
  
  return result;
}

var x = SwitchTest(0);


// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Embedded syntax constructions of switch statement
 *
 * @path ch12/12.11/S12.11_A4_T1.js
 * @description Nesting one "switch" statement into StatementList of the other's
 */

function SwitchTest(value){
  var result = 0;
  
  switch(value) {
    case 0:
      switch(value) {
        case 0:
         result += 3;
        break;
        default:
          result += 32;
          break;
        }
      result *= 2;
      break;
      result=3;
    default:
      result += 32;
      break;
  }
  return result;
}

var x = SwitchTest(0);
if(x!==6) $ERROR("#1: SwitchTest(0) === 6. Actual:  SwitchTest(0) ==="+ SwitchTest(0)  );


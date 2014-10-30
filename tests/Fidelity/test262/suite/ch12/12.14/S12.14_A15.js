// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "try" with "catch" or "finally" statement within/without a "switch" statement
 *
 * @path ch12/12.14/S12.14_A15.js
 * @description Insert try/catch/finally to switch statement
 */

// CHECK#1
function SwitchTest1(value){
  var result = 0;
  try{  
    switch(value) {
      case 1:
        result += 4;
        throw result;
        break;
      default:
        result += 32;
        break;
      case 4:
        result += 64;
        throw "ex";
    }
    return result;
  }
  catch(e){	
    if ((value===1)&&(e!==4)) $ERROR('#1.1: Exception ===4. Actual:  Exception ==='+ e  );
    if ((value===4)&&(e!=="ex")) $ERROR('#1.2: Exception ==="ex". Actual:  Exception ==='+ e  );
  }
  finally{
    return result;
  }
}
if (SwitchTest1(1)!==4) $ERROR('#1.3: SwitchTest1(1)===4. Actual:  SwitchTest1(1)==='+ SwitchTest1(1) );
if (SwitchTest1(4)!==64) $ERROR('#1.4: SwitchTest1(4)===64. Actual:  SwitchTest1(4)==='+ SwitchTest1(4) );

// CHECK#2
var c2=0;
function SwitchTest2(value){
  var result = 0;
  switch(value) {
    case 0:
      try{  
        result += 2;
        break;
      }
      finally{
        c2=1;
      }
    case 1:
      result += 4;
      break;
    default:
      result += 32;
      break;
  }
  return result;
}
if (SwitchTest2(1)!==4) $ERROR('#2.1: SwitchTest1(1)===4. Actual:  SwitchTest1(1)==='+ SwitchTest1(1) );
if (c2===1) $ERROR('#2.2: Evaluate finally block');
if (SwitchTest2(0)!==2) $ERROR('#2.3: SwitchTest1(0)===2. Actual:  SwitchTest1(0)==='+ SwitchTest1(0) );
if (c2!==1) $ERROR('#2.4: "finally" block must be evaluated');

// CHECK#3
function SwitchTest3(value){
  var result = 0;
  switch(value) {
    case 0:
      try{  
        result += 2;
        throw "ex";
      }
      finally{
        break;
      }
    default:
      result += 32;
      break;
  }
  return result;
}
try{
  var x3=SwitchTest3(0);
  if (x3!==2) $ERROR('#3.1: x3===2. Actual: x3==='+x3);
}
catch(e){
  $ERROR('#3.2: Catching exception inside function does not lead to throwing exception outside this function');
}


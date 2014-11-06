// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Result.type is break and Result.target is in the current
 * label set, return (normal, Result.value, empty)
 *
 * @path ch12/12.11/S12.11_A1_T2.js
 * @description Switch with different types of variables
 */

var x = new Number(2);

function SwitchTest(value){
  var result = 0;
  
  switch(value) {
    case 0:
      result += 2;
    case '1':
      result += 4;
      break;
    case new Number(2):
      result += 8;
    case 3:
      result += 16;
    default:
      result += 32;
      break;
    case 4:
      result += 64;
      break;
    case x:
      result += 128;
      break;
    case 0:
      result += 256;
    case 1:
      result += 512;
  }
  
  return result;
}
        
if(!(SwitchTest(0) === 6)){
  $ERROR("#1: SwitchTest(0) === 6. Actual:  SwitchTest(0) ==="+ SwitchTest(0)  );
}

if(!(SwitchTest(1) === 512)){
  $ERROR("#2: SwitchTest(1) === 512. Actual:  SwitchTest(1) ==="+ SwitchTest(1)  );
}

if(!(SwitchTest(2) === 32)){
  $ERROR("#3: SwitchTest(2) === 32. Actual:  SwitchTest(2) ==="+ SwitchTest(2)  );
}

if(!(SwitchTest(3) === 48)){
  $ERROR("#4: SwitchTest(3) === 48. Actual:  SwitchTest(3) ==="+ SwitchTest(3)  );
}

if(!(SwitchTest(4) === 64)){
  $ERROR("#5: SwitchTest(4) === 64. Actual:  SwitchTest(4) ==="+ SwitchTest(4)  );
}

if(!(SwitchTest(true) === 32)){
  $ERROR("#6: SwitchTest(true) === 32. Actual:  SwitchTest(true) ==="+ SwitchTest(true)  );
}

if(!(SwitchTest(false) === 32)){
  $ERROR("#7: SwitchTest(false) === 32. Actual:  SwitchTest(false) ==="+ SwitchTest(false)  );
}

if(!(SwitchTest(null) === 32)){
  $ERROR("#8: SwitchTest(null) === 32. Actual:  SwitchTest(null) ==="+ SwitchTest(null)  );
}

if(!(SwitchTest(void 0) === 32)){
  $ERROR("#9: SwitchTest(void 0) === 32. Actual:  SwitchTest(void 0) ==="+ SwitchTest(void 0)  );
}

if(!(SwitchTest('0') === 32)){
  $ERROR("#10: SwitchTest('0') === 32. Actual:  SwitchTest('0') ==="+ SwitchTest('0')  );
}

if(!(SwitchTest(x) === 128)){
  $ERROR("#10: SwitchTest(x) === 128. Actual:  SwitchTest(x) ==="+ SwitchTest(x)  );
}


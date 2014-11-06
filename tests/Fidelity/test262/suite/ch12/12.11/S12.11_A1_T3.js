// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Result.type is break and Result.target is in the current
 * label set, return (normal, Result.value, empty)
 *
 * @path ch12/12.11/S12.11_A1_T3.js
 * @description Using case with null, NaN, Infinity
 */

function SwitchTest(value){
  var result = 0;
  
  switch(value) {
    case 0:
      result += 2;
    case 1:
      result += 4;
      break;
    case 2:
      result += 8;
    case 3:
      result += 16;
    default:
      result += 32;
      break;
    case null:
      result += 64;
    case NaN:
      result += 128;
      break;
    case Infinity:
      result += 256;
    case 2+3:
      result += 512;
      break;
    case undefined:
      result += 1024;
  }
  
  return result;
}
        
if(!(SwitchTest(0) === 6)){
  $ERROR("#1: SwitchTest(0) === 6. Actual:  SwitchTest(0) ==="+ SwitchTest(0)  );
}

if(!(SwitchTest(1) === 4)){
  $ERROR("#2: SwitchTest(1) === 4. Actual:  SwitchTest(1) ==="+ SwitchTest(1)  );
}

if(!(SwitchTest(2) === 56)){
  $ERROR("#3: SwitchTest(2) === 56. Actual:  SwitchTest(2) ==="+ SwitchTest(2)  );
}

if(!(SwitchTest(3) === 48)){
  $ERROR("#4: SwitchTest(3) === 48. Actual:  SwitchTest(3) ==="+ SwitchTest(3)  );
}

if(!(SwitchTest(4) === 32)){
  $ERROR("#5: SwitchTest(4) === 32. Actual:  SwitchTest(4) ==="+ SwitchTest(4)  );
}

if(!(SwitchTest(5) === 512)){
  $ERROR("#5: SwitchTest(5) === 512. Actual:  SwitchTest(5) ==="+ SwitchTest(5)  );
}

if(!(SwitchTest(true) === 32)){
  $ERROR("#6: SwitchTest(true) === 32. Actual:  SwitchTest(true) ==="+ SwitchTest(true)  );
}

if(!(SwitchTest(false) === 32)){
  $ERROR("#7: SwitchTest(false) === 32. Actual:  SwitchTest(false) ==="+ SwitchTest(false)  );
}

if(!(SwitchTest(null) === 192)){
  $ERROR("#8: SwitchTest(null) === 192. Actual:  SwitchTest(null) ==="+ SwitchTest(null)  );
}

if(!(SwitchTest(void 0) === 1024)){
  $ERROR("#9: SwitchTest(void 0) === 1024. Actual:  SwitchTest(void 0) ==="+ SwitchTest(void 0)  );
}

if(!(SwitchTest(NaN) === 32)){
  $ERROR("#10: SwitchTest(NaN) === 32. Actual:  SwitchTest(NaN) ==="+ SwitchTest(NaN)  );
}

if(!(SwitchTest(Infinity) === 768)){
  $ERROR("#10: SwitchTest(NaN) === 768. Actual:  SwitchTest(NaN) ==="+ SwitchTest(NaN)  );
}


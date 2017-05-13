/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-9.js
 * @description Array.prototype.indexOf must return correct index (Sparse Array)
 */


function testcase() {
  var a = new Array(0,1);  
  a[4294967294] = 2;          // 2^32-2 - is max array element
  a[4294967295] = 3;          // 2^32-1 added as non-array element property
  a[4294967296] = 4;          // 2^32   added as non-array element property
  a[4294967297] = 5;          // 2^32+1 added as non-array element property

  // start searching near the end so in case implementation actually tries to test all missing elements!!
  return (a.indexOf(2,4294967290 ) === 4294967294 &&    
      a.indexOf(3,4294967290) === -1 &&   
      a.indexOf(4,4294967290) === -1 &&  
      a.indexOf(5,4294967290) === -1   ) ;
 }
runTestCase(testcase);

// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Catching objects with try/catch/finally statement
 *
 * @path ch12/12.14/S12.14_A18_T4.js
 * @description Catching string
 */

// CHECK#1
try{
  throw "exception #1";
}
catch(e){
  if (e!=="exception #1") $ERROR('#1: Exception ==="exception #1". Actual:  Exception ==='+ e  );
}

// CHECK#2
try{
  throw "exception"+" #1";
}
catch(e){
  if (e!=="exception #1") $ERROR('#2: Exception ==="exception #1". Actual:  Exception ==='+ e  );
}

// CHECK#3
var b="exception #1";
try{
  throw b;
}
catch(e){
  if (e!=="exception #1") $ERROR('#3: Exception ==="exception #1". Actual:  Exception ==='+ e  );
}

// CHECK#4
var a="exception";
var b=" #1";
try{
  throw a+b;
}
catch(e){
  if (e!=="exception #1") $ERROR('#4: Exception ==="exception #1". Actual:  Exception ==='+ e  );
}


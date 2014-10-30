// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If NewExpression or MemberExpression does not implement internal [[Construct]] method, throw TypeError
 *
 * @path ch11/11.2/11.2.2/S11.2.2_A4_T1.js
 * @description Checking Boolean object case
 */

//CHECK#1
try {
  new new Boolean(true);
  $ERROR('#1: new new Boolean(true) throw TypeError');	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1: new new Boolean(true) throw TypeError');	
  }
}

//CHECK#2
try {
  var x = new Boolean(true);
  new x;
  $ERROR('#2: var x = new Boolean(true); new x throw TypeError');	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2: var x = new Boolean(true); new x throw TypeError');	
  }
}

//CHECK#3
try {
  var x = new Boolean(true);
  new x();
  $ERROR('#3: var x = new Boolean(true); new x() throw TypeError');  
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#3: var x = new Boolean(true); new x() throw TypeError');  
  }
}



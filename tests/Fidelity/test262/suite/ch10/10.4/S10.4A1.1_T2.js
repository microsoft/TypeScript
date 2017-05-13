// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Every function call enters a new execution context
 *
 * @path ch10/10.4/S10.4A1.1_T2.js
 * @description Recursive function call
 */

var y;

function f(a){
  var x;
  
  if (a === 1) 
    return x;
  else {
    if(x === undefined) {
      x = 0;
    } else {
      x = 1;
    }
    return f(1);
  }
}

y = f(0);

if(!(y === undefined)){
  $ERROR("#1: Recursive function calls shares execution context");
}


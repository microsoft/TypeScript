// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Every function call enters a new execution context
 *
 * @path ch10/10.4/S10.4_A1.1_T1.js
 * @description Sequence of function calls
 */

var y;

function f(){
  var x;
  
  if(x === undefined) {
    x = 0;
  } else {
    x = 1;
  }
  
  return x;
}

y = f();
y = f();

if(!(y === 0)){
  $ERROR("#1: Sequenced function calls shares execution context");
}


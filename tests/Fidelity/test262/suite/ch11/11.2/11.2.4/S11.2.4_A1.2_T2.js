// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Arguments : (ArgumentList)
 *
 * @path ch11/11.2/11.2.4/S11.2.4_A1.2_T2.js
 * @description Function is declared with FormalParameterList
 */

f_arg = function(x,y) {
  return arguments;
}

//CHECK#1
if (f_arg(1,2,3).length !== 3) {
  $ERROR('#1: f_arg = function(x,y) {return arguments;} f_arg(1,2,3).length === 3. Actual: ' + (f_arg(1,2,3).length));
}

//CHECK#2
if (f_arg(1)[0] !== 1) {
  $ERROR('#1: f_arg = function(x,y) {return arguments;} f_arg(1)[0] === 1. Actual: ' + (f_arg(1)[0]));
}

//CHECK#3
if (f_arg(1,2)[1] !== 2) {
  $ERROR('#3: f_arg = function(x,y) {return arguments;} f_arg(1,2)[1] === 2. Actual: ' + (f_arg(1,2)[1]));
}

//CHECK#4
if (f_arg(1,2,3)[2] !== 3) {
  $ERROR('#4: f_arg = function(x,y) {return arguments;} f_arg(1,2,3)[2] === 3. Actual: ' + (f_arg(1,2,3)[2]));
}

//CHECK#5
if (f_arg(1,2,3)[3] !== undefined) {
  $ERROR('#5: f_arg = function(x,y) {return arguments;} f_arg(1,2,3)[3] === undefined. Actual: ' + (f_arg(1,2,3)[3]));
}

//CHECK#6
if (f_arg.length !== 2) {
  $ERROR('#6: f_arg = function(x,y) {return arguments;} f_arg.length === 2. Actual: ' + (f_arg.length));
}


// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Arguments : ()
 *
 * @path ch11/11.2/11.2.4/S11.2.4_A1.1_T2.js
 * @description Function is declared with FormalParameterList
 */

function f_arg(x,y) {
  return arguments;
}

//CHECK#1
if (f_arg().length !== 0) {
  $ERROR('#1: function f_arg(x,y) {return arguments;} f_arg().length === 0. Actual: ' + (f_arg().length));
}

//CHECK#2
if (f_arg()[0] !== undefined) {
  $ERROR('#2: function f_arg(x,y) {return arguments;} f_arg()[0] === undefined. Actual: ' + (f_arg()[0]));
}

//CHECK#3
if (f_arg.length !== 2) {
  $ERROR('#3: function f_arg(x,y) {return arguments;} f_arg.length === 2. Actual: ' + (f_arg.length));
}


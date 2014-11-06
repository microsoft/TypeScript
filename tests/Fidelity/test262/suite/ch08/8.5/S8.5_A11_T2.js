// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The integer 0 has two representations, +0 and -0
 *
 * @path ch08/8.5/S8.5_A11_T2.js
 * @description Compare positive_zero and negative_zero
 */

var p_zero=+0;
var n_zero=-0;

//CHECK #1
if ((p_zero == n_zero) !== true){
  $ERROR('#1: var p_zero=+0; var n_zero=-0; p_zero != n_zero');
}

//CHECK #2
if ((n_zero == 0) !== true){
  $ERROR('#2: var p_zero=+0; var n_zero=-0; n_zero == 0');
}

//CHECK #3
if ((p_zero == -0) !== true){
  $ERROR('#3: var p_zero=+0; var n_zero=-0; p_zero == -0');
}

//CHECK #4
if ((p_zero === 0) !== true){
  $ERROR('#4: var p_zero=+0; var n_zero=-0; p_zero === 0');
}

//CHECK #5
if ((n_zero === -0) !== true){
  $ERROR('#5: var p_zero=+0; var n_zero=-0; n_zero === -0');
}


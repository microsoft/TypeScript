// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The 0 property of the newly constructed object is set to item0
 * (if supplied); the 1 property of the newly constructed object is set to item1
 * (if supplied); and, in general, for as many arguments as there are, the k property
 * of the newly constructed object is set to argument k, where the first argument is
 * considered to be argument number 0
 *
 * @path ch15/15.4/15.4.2/15.4.2.1/S15.4.2.1_A2.2_T1.js
 * @description Checking correct work this algorithm
 */

//CHECK#
var x = new Array(
0,1,2,3,4,5,6,7,8,9,
10,11,12,13,14,15,16,17,18,19,
20,21,22,23,24,25,26,27,28,29,
30,31,32,33,34,35,36,37,38,39,
40,41,42,43,44,45,46,47,48,49,
50,51,52,53,54,55,56,57,58,59,
60,61,62,63,64,65,66,67,68,69,
70,71,72,73,74,75,76,77,78,79,
80,81,82,83,84,85,86,87,88,89,
90,91,92,93,94,95,96,97,98,99
);

for (var i = 0; i < 100; i++) {
  var result = true;
  if (x[i] !== i) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: x[i] === i. Actual: ' + (x[i]));
}    


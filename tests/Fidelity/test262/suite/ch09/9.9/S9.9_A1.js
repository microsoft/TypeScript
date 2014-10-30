// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ToObject conversion from undefined value must throw TypeError
 *
 * @path ch09/9.9/S9.9_A1.js
 * @description Trying to convert undefined to Object
 * @noStrict
 */

// CHECK#1
try{
  undefined['foo'];
  $ERROR('#1.1: undefined[\'foo\'] must throw TypeError. Actual: ' + (undefined['foo']));
}
catch(e){
  if((e instanceof TypeError) !== true){
    $ERROR('#1.2: undefined[\'foo\'] must throw TypeError. Actual: ' + (e));
  }
}

// CHECK#2
try{
  with(undefined) x = 2;
  $ERROR('#2.1: with(undefined) x = 2 must throw TypeError. Actual: x === ' + (x));
}
catch(e){
  if((e instanceof TypeError) !== true){
    $ERROR('#2.2: with(undefined) x = 2 must throw TypeError. Actual: ' + (e));
  }
}


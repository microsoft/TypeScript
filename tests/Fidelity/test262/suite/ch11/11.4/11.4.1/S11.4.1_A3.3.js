// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If the property doesn't have the DontDelete attribute, remove the property
 *
 * @path ch11/11.4/11.4.1/S11.4.1_A3.3.js
 * @description Checking declared variable
 */

//CHECK#1
try {
  x = 1;
  delete x;
  x;    
  $ERROR('#1: x = 1; delete x; x is not exist');
} catch (e) {
  if (e instanceof ReferenceError !== true) {
    $ERROR('#1: x = 1; delete x; x is not exist');
  }
}


//CHECK#2
function MyFunction(){};
MyFunction.prop = 1;
delete MyFunction.prop;
if (MyFunction.prop !== undefined) {
  $ERROR('#2: function MyFunction(){}; MyFunction.prop = 1; delete MyFunction.prop; MyFunction.prop === undefined. Actual: ' + (MyFunction.prop));

}

//CHECK#3
function MyFunction(){};
var MyObjectVar = new MyFunction();
MyObjectVar.prop = 1;
delete MyObjectVar.prop;
if (MyObjectVar.prop !== undefined) {
  $ERROR('#3: function MyFunction(){}; var MyObjectVar = new MyFunction(); MyFunction.prop = 1; delete MyObjectVar.prop; MyObjectVar.prop === undefined. Actual: ' + (MyObjectVar.prop));
}

//CHECK#4
if (delete MyObjectVar !== false) {
  $ERROR('#4: function MyFunction(){}; var MyObjectVar = new MyFunction(); delete MyObjectVar === false');
}

//CHECK#5
function MyFunction(){};
MyObjectNotVar = new MyFunction();
MyObjectNotVar.prop = 1;
delete MyObjectNotVar.prop;
if (MyObjectNotVar.prop !== undefined) {
  $ERROR('#5: function MyFunction(){}; MyObjectNotVar = new MyFunction(); MyFunction.prop = 1; delete MyObjectNotVar.prop; MyObjectNotVar.prop === undefined. Actual: ' + (MyObjectNotVar.prop));
}

//CHECK#6
if (delete MyObjectNotVar !== true) {
  $ERROR('#6: function MyFunction(){}; var MyObjectNotVar = new MyFunction(); delete MyObjectNotVar === true');
}



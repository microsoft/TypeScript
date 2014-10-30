// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of number conversion from object value is the result
 * of conversion from primitive value
 *
 * @path ch09/9.3/S9.3_A5_T1.js
 * @description new Number(), new Number(0), new Number(Number.NaN), new Number(null),
 * new Number(void 0) and others convert to Number by explicit transformation
 */

// CHECK#1
if (Number(new Number()) !== 0) {
  $ERROR('#1: Number(new Number()) === 0. Actual: ' + (Number(new Number())));
}

// CHECK#2
if (Number(new Number(0)) !== 0) {
  $ERROR('#2: Number(new Number(0)) === 0. Actual: ' + (Number(new Number(0))));
}

// CHECK#3
if (isNaN(Number(new Number(Number.NaN)) !== true)) {
  $ERROR('#3: Number(new Number(Number.NaN)) === Not-a-Number. Actual: ' + (Number(new Number(Number.NaN))));
}

// CHECK#4
if (Number(new Number(null)) !== 0) {
  $ERROR('#4.1: Number(new Number(null)) === 0. Actual: ' + (Number(new Number(null)))); 
} else {
  if (1/Number(new Number(null)) !== Number.POSITIVE_INFINITY) {
    $ERROR('#4.2: Number(new Number(null)) === +0. Actual: -0');
  }	
}

// CHECK#5
if (isNaN(Number(new Number(void 0)) !== true)) {
  $ERROR('#5: Number(new Number(void 0)) === Not-a-Number. Actual: ' + (Number(new Number(void 0))));
}

// CHECK#6
if (Number(new Number(true)) !== 1) {
  $ERROR('#6: Number(new Number(true)) === 1. Actual: ' + (Number(new Number(true))));
}

// CHECK#7
if (Number(new Number(false)) !== +0) {
  $ERROR('#7.1: Number(new Number(false)) === 0. Actual: ' + (Number(new Number(false))));
} else {
  if (1/Number(new Number(false)) !== Number.POSITIVE_INFINITY) {
    $ERROR('#7.2: Number(new Number(false)) === +0. Actual: -0');
  }
}

// CHECK#8
if (Number(new Boolean(true)) !== 1) {
  $ERROR('#8: Number(new Boolean(true)) === 1. Actual: ' + (Number(new Boolean(true))));
}

// CHECK#9
if (Number(new Boolean(false)) !== +0) {
  $ERROR('#9.1: Number(new Boolean(false)) === 0. Actual: ' + (Number(new Boolean(false))));
} else {
  if (1/Number(new Boolean(false)) !== Number.POSITIVE_INFINITY) {
    $ERROR('#9.2: Number(new Boolean(false)) === +0. Actual: -0');
  }
}

// CHECK#10
if (isNaN(Number(new Array(2,4,8,16,32))) !== true) {
  $ERROR('#10: Number(new Array(2,4,8,16,32)) === Not-a-Number. Actual: ' + (Number(new Array(2,4,8,16,32))));
}

// CHECK#11
var myobj1 = {
                ToNumber : function(){return 12345;}, 
                toString : function(){return "67890";},
                valueOf  : function(){return "[object MyObj]";} 
            };

if (isNaN(Number(myobj1)) !== true){
  $ERROR("#11: Number(myobj1) calls ToPrimitive with hint Number. Actual: " + (Number(myobj1)));
}

// CHECK#12
var myobj2 = {
                ToNumber : function(){return 12345;}, 
                toString : function(){return "67890";},
                valueOf  : function(){return "9876543210";} 
            };

if (Number(myobj2) !== 9876543210){
  $ERROR("#12: Number(myobj2) calls ToPrimitive with hint Number. Exptected: 9876543210. Actual: " + (Number(myobj2)));
}


// CHECK#13
var myobj3 = {
                ToNumber : function(){return 12345;}, 
                toString : function(){return "[object MyObj]";} 
            };

if (isNaN(Number(myobj3)) !== true){
  $ERROR("#13: Number(myobj3) calls ToPrimitive with hint Number. Exptected: Not-a-Number.  Actual: " + (Number(myobj3)));
}

// CHECK#14
var myobj4 = {
                ToNumber : function(){return 12345;}, 
                toString : function(){return "67890";} 
            };

if (Number(myobj4) !== 67890){
  $ERROR("#14: Number(myobj4) calls ToPrimitive with hint Number. Exptected: 67890.  Actual: " + (Number(myobj4)));
}

// CHECK#15
var myobj5 = {
                ToNumber : function(){return 12345;} 
            };

if (isNaN(Number(myobj5)) !== true){
  $ERROR("#15: Number(myobj5) calls ToPrimitive with hint Number. Exptected: Not-a-Number.  Actual: " + (Number(myobj5)));
}


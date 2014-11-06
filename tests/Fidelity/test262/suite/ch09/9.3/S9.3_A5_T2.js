// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of number conversion from object value is the result
 * of conversion from primitive value
 *
 * @path ch09/9.3/S9.3_A5_T2.js
 * @description new Number(), new Number(0), new Number(Number.NaN), new Number(null),
 * new Number(void 0) and others convert to Number by implicit transformation
 */

// CHECK#1
if (+(new Number()) !== 0) {
  $ERROR('#1: +(new Number()) === 0. Actual: ' + (+(new Number())));
}

// CHECK#2
if (+(new Number(0)) !== 0) {
  $ERROR('#2: +(new Number(0)) === 0. Actual: ' + (+(new Number(0))));
}

// CHECK#3
if (isNaN(+(new Number(Number.NaN)) !== true)) {
  $ERROR('#3: +(new Number(Number.NaN)) === Not-a-Number. Actual: ' + (+(new Number(Number.NaN))));
}

// CHECK#4
if (+(new Number(null)) !== 0) {
  $ERROR('#4.1: +(new Number(null)) === 0. Actual: ' + (+(new Number(null)))); 
} else {
  if (1/+(new Number(null)) !== Number.POSITIVE_INFINITY) {
    $ERROR('#4.2: +(new Number(null)) === +0. Actual: -0');
  }	
}

// CHECK#5
if (isNaN(+(new Number(void 0)) !== true)) {
  $ERROR('#5: +(new Number(void 0)) === Not-a-Number. Actual: ' + (+(new Number(void 0))));
}

// CHECK#6
if (+(new Number(true)) !== 1) {
  $ERROR('#6: +(new Number(true)) === 1. Actual: ' + (+(new Number(true))));
}

// CHECK#7
if (+(new Number(false)) !== +0) {
  $ERROR('#7.1: +(new Number(false)) === 0. Actual: ' + (+(new Number(false))));
} else {
  if (1/+(new Number(false)) !== Number.POSITIVE_INFINITY) {
    $ERROR('#7.2: +(new Number(false)) === +0. Actual: -0');
  }
}

// CHECK#8
if (+(new Boolean(true)) !== 1) {
  $ERROR('#8: +(new Boolean(true)) === 1. Actual: ' + (+(new Boolean(true))));
}

// CHECK#9
if (+(new Boolean(false)) !== +0) {
  $ERROR('#9.1: +(new Boolean(false)) === 0. Actual: ' + (+(new Boolean(false))));
} else {
  if (1/+(new Boolean(false)) !== Number.POSITIVE_INFINITY) {
    $ERROR('#9.2: +(new Boolean(false)) === +0. Actual: -0');
  }
}

// CHECK#10
if (isNaN(+(new Array(2,4,8,16,32))) !== true) {
  $ERROR('#10: +(new Array(2,4,8,16,32)) === Not-a-Number. Actual: ' + (+(new Array(2,4,8,16,32))));
}

// CHECK#11
var myobj1 = {
                ToNumber : function(){return 12345;}, 
                toString : function(){return "67890";},
                valueOf  : function(){return "[object MyObj]";} 
            };

if (isNaN(+(myobj1)) !== true){
  $ERROR("#11: +(myobj1) calls ToPrimitive with hint +. Exptected: Not-a-Number. Actual: " + (+(myobj1)));
}

// CHECK#12
var myobj2 = {
                ToNumber : function(){return 12345;}, 
                toString : function(){return "67890";},
                valueOf  : function(){return "9876543210";} 
            };

if (+(myobj2) !== 9876543210){
  $ERROR("#12: +(myobj2) calls ToPrimitive with hint +. Exptected: 9876543210. Actual: " + (+(myobj2)));
}


// CHECK#13
var myobj3 = {
                ToNumber : function(){return 12345;}, 
                toString : function(){return "[object MyObj]";} 
            };

if (isNaN(+(myobj3)) !== true){
  $ERROR("#13: +(myobj3) calls ToPrimitive with hint +. Exptected: Not-a-Number. Actual: " + (+(myobj3)));
}

// CHECK#14
var myobj4 = {
                ToNumber : function(){return 12345;}, 
                toString : function(){return "67890";} 
            };

if (+(myobj4) !== 67890){
  $ERROR("#14: +(myobj4) calls ToPrimitive with hint +. Exptected: 67890. Actual: " + (+(myobj4)));
}

// CHECK#15
var myobj5 = {
                ToNumber : function(){return 12345;} 
            };

if (isNaN(+(myobj5)) !== true){
  $ERROR("#15: +(myobj5) calls ToPrimitive with hint +. Exptected: 12345. Actual: " + (+(myobj5)));
}


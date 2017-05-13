// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of String conversion from Object value is conversion
 * from primitive value
 *
 * @path ch09/9.8/S9.8_A5_T1.js
 * @description Some objects convert to String by explicit transformation
 */

// CHECK#1
if (String(new Number()) !== "0") {
  $ERROR('#1: String(new Number()) === "0". Actual: ' + (String(new Number())));
}

// CHECK#2
if (String(new Number(0)) !== "0") {
  $ERROR('#2: String(new Number(0)) === "0". Actual: ' + (String(new Number(0))));
}

// CHECK#3
if (String(new Number(Number.NaN)) !== "NaN") {
  $ERROR('#3: String(new Number(Number.NaN)) === Not-a-Number. Actual: ' + (String(new Number(Number.NaN))));
}

// CHECK#4
if (String(new Number(null)) !== "0") {
  $ERROR('#4: String(new Number(null)) === "0". Actual: ' + (String(new Number(null)))); 
}

// CHECK#5
if (String(new Number(void 0)) !== "NaN") {
  $ERROR('#5: String(new Number(void 0)) === Not-a-Number. Actual: ' + (String(new Number(void 0))));
}

// CHECK#6
if (String(new Number(true)) !== "1") {
  $ERROR('#6: String(new Number(true)) === "1". Actual: ' + (String(new Number(true))));
}

// CHECK#7
if (String(new Number(false)) !== "0") {
  $ERROR('#7: String(new Number(false)) === "0". Actual: ' + (String(new Number(false))));
}

// CHECK#8
if (String(new Boolean(true)) !== "true") {
  $ERROR('#8: String(new Boolean(true)) === "true". Actual: ' + (String(new Boolean(true))));
}

// CHECK#9
if (String(new Boolean(false)) !== "false") {
  $ERROR('#9: Number(new Boolean(false)) === "false". Actual: ' + (Number(new Boolean(false))));
}

// CHECK#10
if (String(new Array(2,4,8,16,32)) !== "2,4,8,16,32") {
  $ERROR('#10: String(new Array(2,4,8,16,32)) === "2,4,8,16,32". Actual: ' + (String(new Array(2,4,8,16,32))));
}

// CHECK#11
var myobj1 = {
                toNumber : function(){return 12345;}, 
                toString : function(){return 67890;},
                valueOf  : function(){return "[object MyObj]";} 
            };

if (String(myobj1) !== "67890"){
  $ERROR("#11: String(myobj) calls ToPrimitive with hint String");
}

// CHECK#12
var myobj2 = {
                toNumber : function(){return 12345;},
                toString : function(){return {}}, 
                valueOf  : function(){return "[object MyObj]";} 
            };

if (String(myobj2) !== "[object MyObj]"){
  $ERROR("#12: String(myobj) calls ToPrimitive with hint String");
}

// CHECK#13
var myobj3 = {
                toNumber : function(){return 12345;},
                valueOf  : function(){return "[object MyObj]";} 
            };

if (String(myobj3) !== "[object Object]"){
  $ERROR("#13: String(myobj) calls ToPrimitive with hint String");
}


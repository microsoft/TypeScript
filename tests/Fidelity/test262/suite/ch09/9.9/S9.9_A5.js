// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ToObject conversion from String: create a new String object
 * whose [[value]] property is set to the value of the string
 *
 * @path ch09/9.9/S9.9_A5.js
 * @description Converting from various strings to Object
 */

// CHECK#1
if (Object("some string").valueOf() !== "some string"){
  $ERROR('#1: Object("some string").valueOf() === "some string". Actual: ' + (Object("some string").valueOf()));
}

// CHECK#2
if (typeof Object("some string") !== "object"){
  $ERROR('#2: typeof Object("some string") === "object". Actual: ' + (typeof Object("some string")));
}

// CHECK#3
if (Object("some string").constructor.prototype !== String.prototype){
  $ERROR('#3: Object("some string").constructor.prototype === String.prototype. Actual: ' + (Object("some string").constructor.prototype));
}

// CHECK#4
if (Object("").valueOf() !== ""){
  $ERROR('#4: Object("").valueOf() === false. Actual: ' + (Object("").valueOf()));
}

// CHECK#5
if (typeof Object("") !== "object"){
  $ERROR('#5: typeof Object("") === "object". Actual: ' + (typeof Object("")));
}

// CHECK#6
if (Object("").constructor.prototype !== String.prototype){
  $ERROR('#6: Object("").constructor.prototype === String.prototype. Actual: ' + (Object("").constructor.prototype));
}

// CHECK#7
if (Object("\r\t\b\n\v\f").valueOf() !== "\r\t\b\n\v\f"){
  $ERROR('#7: Object("\\r\\t\\b\\n\\v\\f").valueOf() === false. Actual: ' + (Object("\r\t\b\n\v\f").valueOf()));
}

// CHECK#8
if (typeof Object("\r\t\b\n\v\f") !== "object"){
  $ERROR('#8: typeof Object("\\r\\t\\b\\n\\v\\f") === "object". Actual: ' + (typeof Object("\r\t\b\n\v\f")));
}

// CHECK#9
if (Object("\r\t\b\n\v\f").constructor.prototype !== String.prototype){
  $ERROR('#9: Object("\\r\\t\\b\\n\\v\\f").constructor.prototype === String.prototype. Actual: ' + (Object("\r\t\b\n\v\f").constructor.prototype));
}

// CHECK#10
if (Object(String(10)).valueOf() !== "10"){
  $ERROR('#10: Object(String(10)).valueOf() === false. Actual: ' + (Object(String(10)).valueOf()));
}

// CHECK#11
if (typeof Object(String(10)) !== "object"){
  $ERROR('#11: typeof Object(String(10)) === "object". Actual: ' + (typeof Object(String(10))));
}

// CHECK#12
if (Object(String(10)).constructor.prototype !== String.prototype){
  $ERROR('#12: Object(String(10)).constructor.prototype === String.prototype. Actual: ' + (Object(String(10)).constructor.prototype));
}


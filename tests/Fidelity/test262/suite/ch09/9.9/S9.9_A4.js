// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ToObject conversion from Number: create a new Number object
 * whose [[value]] property is set to the value of the number
 *
 * @path ch09/9.9/S9.9_A4.js
 * @description Converting from various numbers to Object
 */

// CHECK#1
if (Object(0).valueOf() !== 0){
  $ERROR('#1: Object(0).valueOf() === 0. Actual: ' + (Object(0).valueOf()));
}

// CHECK#2
if (typeof Object(0) !== "object"){
  $ERROR('#2: typeof Object(0) === "object". Actual: ' + (typeof Object(0)));
}

// CHECK#3
if (Object(0).constructor.prototype !== Number.prototype){
  $ERROR('#3: Object(0).constructor.prototype === Number.prototype. Actual: ' + (Object(0).constructor.prototype));
}

// CHECK#4
if (Object(-0).valueOf() !== -0){
  $ERROR('#4.1: Object(-0).valueOf() === 0. Actual: ' + (Object(-0).valueOf()));
} else if (1/Object(-0).valueOf() !== Number.NEGATIVE_INFINITY) {
  $ERROR('#4.2: Object(-0).valueOf() === -0. Actual: +0');
}

// CHECK#5
if (typeof Object(-0) !== "object"){
  $ERROR('#5: typeof Object(-0) === "object". Actual: ' + (typeof Object(-0)));
}

// CHECK#6
if (Object(-0).constructor.prototype !== Number.prototype){
  $ERROR('#6: Object(-0).constructor.prototype === Number.prototype. Actual: ' + (Object(-0).constructor.prototype));
}

// CHECK#7
if (Object(1).valueOf() !== 1){
  $ERROR('#7: Object(1).valueOf() === 1. Actual: ' + (Object(1).valueOf()));
}

// CHECK#8
if (typeof Object(1) !== "object"){
  $ERROR('#8: typeof Object(1) === "object". Actual: ' + (typeof Object(1)));
}

// CHECK#9
if (Object(1).constructor.prototype !== Number.prototype){
  $ERROR('#9: Object(1).constructor.prototype === Number.prototype. Actual: ' + (Object(1).constructor.prototype));
}

// CHECK#10
if (Object(-1).valueOf() !== -1){
  $ERROR('#10: Object(-1).valueOf() === -1. Actual: ' + (Object(-1).valueOf()));
}

// CHECK#11
if (typeof Object(-1) !== "object"){
  $ERROR('#11: typeof Object(-1) === "object". Actual: ' + (typeof Object(-1)));
}

// CHECK#12
if (Object(-1).constructor.prototype !== Number.prototype){
  $ERROR('#12: Object(-1).constructor.prototype === Number.prototype. Actual: ' + (Object(-1).constructor.prototype));
}

// CHECK#13
if (Object(Number.MIN_VALUE).valueOf() !== Number.MIN_VALUE){
  $ERROR('#13: Object(Number.MIN_VALUE).valueOf() === Number.MIN_VALUE. Actual: ' + (Object(Number.MIN_VALUE).valueOf()));
}

// CHECK#14
if (typeof Object(Number.MIN_VALUE) !== "object"){
  $ERROR('#14: typeof Object(Number.MIN_VALUE) === "object". Actual: ' + (typeof Object(Number.MIN_VALUE)));
}

// CHECK#15
if (Object(Number.MIN_VALUE).constructor.prototype !== Number.prototype){
  $ERROR('#15: Object(Number.MIN_VALUE).constructor.prototype === Number.prototype. Actual: ' + (Object(Number.MIN_VALUE).constructor.prototype));
}

// CHECK#16
if (Object(Number.MAX_VALUE).valueOf() !== Number.MAX_VALUE){
  $ERROR('#16: Object(Number.MAX_VALUE).valueOf() === Number.MAX_VALUE. Actual: ' + (Object(Number.MAX_VALUE).valueOf()));
}

// CHECK#17
if (typeof Object(Number.MAX_VALUE) !== "object"){
  $ERROR('#17: typeof Object(Number.MAX_VALUE) === "object". Actual: ' + (typeof Object(Number.MAX_VALUE)));
}

// CHECK#18
if (Object(Number.MAX_VALUE).constructor.prototype !== Number.prototype){
  $ERROR('#18: Object(Number.MAX_VALUE).constructor.prototype === Number.prototype. Actual: ' + (Object(Number.MAX_VALUE).constructor.prototype));
}

// CHECK#19
if (Object(Number.POSITIVE_INFINITY).valueOf() !== Number.POSITIVE_INFINITY){
  $ERROR('#19: Object(Number.POSITIVE_INFINITY).valueOf() === Number.POSITIVE_INFINITY. Actual: ' + (Object(Number.POSITIVE_INFINITY).valueOf()));
}

// CHECK#20
if (typeof Object(Number.POSITIVE_INFINITY) !== "object"){
  $ERROR('#20: typeof Object(Number.POSITIVE_INFINITY) === "object". Actual: ' + (typeof Object(Number.POSITIVE_INFINITY)));
}

// CHECK#21
if (Object(Number.POSITIVE_INFINITY).constructor.prototype !== Number.prototype){
  $ERROR('#21: Object(Number.POSITIVE_INFINITY).constructor.prototype === Number.prototype. Actual: ' + (Object(Number.POSITIVE_INFINITY).constructor.prototype));
}

// CHECK#22
if (Object(Number.NEGATIVE_INFINITY).valueOf() !== Number.NEGATIVE_INFINITY){
  $ERROR('#22: Object(Number.NEGATIVE_INFINITY).valueOf() === Number.NEGATIVE_INFINITY. Actual: ' + (Object(Number.NEGATIVE_INFINITY).valueOf()));
}

// CHECK#23
if (typeof Object(Number.NEGATIVE_INFINITY) !== "object"){
  $ERROR('#23: typeof Object(Number.NEGATIVE_INFINITY) === "object". Actual: ' + (typeof Object(Number.NEGATIVE_INFINITY)));
}

// CHECK#24
if (Object(Number.NEGATIVE_INFINITY).constructor.prototype !== Number.prototype){
  $ERROR('#24: Object(Number.NEGATIVE_INFINITY).constructor.prototype === Number.prototype. Actual: ' + (Object(Number.NEGATIVE_INFINITY).constructor.prototype));
}

// CHECK#25
if (isNaN(Object(Number.NaN).valueOf()) !== true){
  $ERROR('#25: Object(Number.NaN).valueOf() === Not-a-Number. Actual: ' + (Object(Number.NaN).valueOf()));
}

// CHECK#26
if (typeof Object(Number.NaN) !== "object"){
  $ERROR('#26: typeof Object(Number.NaN) === "object". Actual: ' + (typeof Object(Number.NaN)));
}

// CHECK#27
if (Object(Number.NaN).constructor.prototype !== Number.prototype){
  $ERROR('#27: Object(Number.NaN).constructor.prototype === Number.prototype. Actual: ' + (Object(Number.NaN).constructor.prototype));
}

// CHECK#28
if (Object(1.2345).valueOf() !== 1.2345){
  $ERROR('#28: Object(1.2345).valueOf() === 1.2345. Actual: ' + (Object(1.2345).valueOf()));
}

// CHECK#29
if (typeof Object(1.2345) !== "object"){
  $ERROR('#29: typeof Object(1.2345) === "object". Actual: ' + (typeof Object(1.2345)));
}

// CHECK#30
if (Object(1.2345).constructor.prototype !== Number.prototype){
  $ERROR('#30: Object(1.2345).constructor.prototype === Number.prototype. Actual: ' + (Object(1.2345).constructor.prototype));
}

// CHECK#31
if (Object(-1.2345).valueOf() !== -1.2345){
  $ERROR('#31: Object(-1.2345).valueOf() === -1.2345. Actual: ' + (Object(-1.2345).valueOf()));
}

// CHECK#32
if (typeof Object(-1.2345) !== "object"){
  $ERROR('#32: typeof Object(-1.2345) === "object". Actual: ' + (typeof Object(-1.2345)));
}

// CHECK#33
if (Object(-1.2345).constructor.prototype !== Number.prototype){
  $ERROR('#33: Object(-1.2345).constructor.prototype === Number.prototype. Actual: ' + (Object(-1.2345).constructor.prototype));
}


// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Prototype]] property of the newly constructed object
 * is set to the original Date prototype object, the one that is the
 * initial value of Date.prototype
 *
 * @path ch15/15.9/15.9.3/S15.9.3.2_A2_T1.js
 * @description Checking Date.prototype property of newly constructed objects
 */

$INCLUDE("Date_constants.js");

var x11 = new Date(date_1899_end);
if (typeof x11.constructor.prototype !== "object") {
  $FAIL("#1.1: typeof x11.constructor.prototype === 'object'");
}

var x12 = new Date(date_1899_end);
if (!Date.prototype.isPrototypeOf(x12)) {
  $ERROR('#1.2: Date.prototype.isPrototypeOf(x12)');
}

var x13 = new Date(date_1899_end);
if(Date.prototype !== x13.constructor.prototype){
  $FAIL("#1.3: Date.prototype !== x13.constructor.prototype");
}

var x21 = new Date(date_1900_start);
if (typeof x21.constructor.prototype !== "object") {
  $FAIL("#2.1: typeof x21.constructor.prototype === 'object'");
}

var x22 = new Date(date_1900_start);
if (!Date.prototype.isPrototypeOf(x22)) {
  $ERROR('#2.2: Date.prototype.isPrototypeOf(x22)');
}

var x23 = new Date(date_1900_start);
if(Date.prototype !== x23.constructor.prototype){
  $FAIL("#2.3: Date.prototype !== x23.constructor.prototype");
}

var x31 = new Date(date_1969_end);
if (typeof x31.constructor.prototype !== "object") {
  $FAIL("#3.1: typeof x31.constructor.prototype === 'object'");
}

var x32 = new Date(date_1969_end);
if (!Date.prototype.isPrototypeOf(x32)) {
  $ERROR('#3.2: Date.prototype.isPrototypeOf(x32)');
}

var x33 = new Date(date_1969_end);
if(Date.prototype !== x33.constructor.prototype){
  $FAIL("#3.3: Date.prototype !== x33.constructor.prototype");
}

var x41 = new Date(date_1970_start);
if (typeof x41.constructor.prototype !== "object") {
  $FAIL("#4.1: typeof x11.constructor.prototype === 'object'");
}

var x42 = new Date(date_1970_start);
if (!Date.prototype.isPrototypeOf(x42)) {
  $ERROR('#4.2: Date.prototype.isPrototypeOf(x42)');
}

var x43 = new Date(date_1970_start);
if(Date.prototype !== x43.constructor.prototype){
  $FAIL("#4.3: Date.prototype !== x43.constructor.prototype");
}

var x51 = new Date(date_1999_end);
if (typeof x51.constructor.prototype !== "object") {
  $FAIL("#5.1: typeof x51.constructor.prototype === 'object'");
}

var x52 = new Date(date_1999_end);
if (!Date.prototype.isPrototypeOf(x52)) {
  $ERROR('#5.2: Date.prototype.isPrototypeOf(x52)');
}

var x53 = new Date(date_1999_end);
if(Date.prototype !== x53.constructor.prototype){
  $FAIL("#5.3: Date.prototype !== x53.constructor.prototype");
}

var x61 = new Date(date_2000_start);
if (typeof x61.constructor.prototype !== "object") {
  $FAIL("#6.1: typeof x61.constructor.prototype === 'object'");
}

var x62 = new Date(date_2000_start);
if (!Date.prototype.isPrototypeOf(x62)) {
  $ERROR('#6.2: Date.prototype.isPrototypeOf(x62)');
}

var x63 = new Date(date_2000_start);
if(Date.prototype !== x63.constructor.prototype){
  $FAIL("#6.3: Date.prototype !== x63.constructor.prototype");
}

var x71 = new Date(date_2099_end);
if (typeof x71.constructor.prototype !== "object") {
  $FAIL("#7.1: typeof x71.constructor.prototype === 'object'");
}

var x72 = new Date(date_2099_end);
if (!Date.prototype.isPrototypeOf(x72)) {
  $ERROR('#7.2: Date.prototype.isPrototypeOf(x72)');
}

var x73 = new Date(date_2099_end);
if(Date.prototype !== x73.constructor.prototype){
  $FAIL("#7.3: Date.prototype !== x73.constructor.prototype");
}

var x81 = new Date(date_2100_start);
if (typeof x81.constructor.prototype !== "object") {
  $FAIL("#8.1: typeof x81.constructor.prototype === 'object'");
}

var x82 = new Date(date_2100_start);
if (!Date.prototype.isPrototypeOf(x82)) {
  $ERROR('#8.2: Date.prototype.isPrototypeOf(x82)');
}

var x83 = new Date(date_2100_start);
if(Date.prototype !== x83.constructor.prototype){
  $FAIL("#8.3: Date.prototype !== x83.constructor.prototype");
}


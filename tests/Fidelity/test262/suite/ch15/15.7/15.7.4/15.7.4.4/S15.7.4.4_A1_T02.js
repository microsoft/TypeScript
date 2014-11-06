// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.prototype.valueOf() returns this number value
 *
 * @path ch15/15.7/15.7.4/15.7.4.4/S15.7.4.4_A1_T02.js
 * @description calling with argument
 */

//CHECK#1
if(Number.prototype.valueOf("argument") !== 0){
  $ERROR('#1: Number.prototype.valueOf("argument") === 0');
}

//CHECK#2
if((new Number()).valueOf("argument") !== 0){
  $ERROR('#2: (new Number()).valueOf("argument") === 0');
}

//CHECK#3
if((new Number(0)).valueOf("argument") !== 0){
  $ERROR('#3: (new Number(0)).valueOf("argument") === 0');
}

//CHECK#4
if((new Number(-1)).valueOf("argument") !== -1){
  $ERROR('#4: (new Number(-1)).valueOf("argument") === -1');
}

//CHECK#5
if((new Number(1)).valueOf("argument") !== 1){
  $ERROR('#5: (new Number(1)).valueOf("argument") === 1');
}

//CHECK#6
if(!isNaN((new Number(Number.NaN)).valueOf("argument"))){
  $ERROR('#6: (new Number(Number.NaN)).valueOf("argument") === NaN');
}

//CHECK#7
if((new Number(Number.POSITIVE_INFINITY)).valueOf("argument") !== Number.POSITIVE_INFINITY){
  $ERROR('#7: (new Number(Number.POSITIVE_INFINITY)).valueOf("argument") === Infinity');
}

//CHECK#8
if((new Number(Number.NEGATIVE_INFINITY)).valueOf("argument") !== Number.NEGATIVE_INFINITY){
  $ERROR('#8: (new Number(Number.NEGATIVE_INFINITY)).valueOf("argument") === -Infinity');
}


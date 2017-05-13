// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(Primitive(x)) is String and Type(Primitive(y)) is String, then operator x > y returns ToString(x) > ToString(y)
 *
 * @path ch11/11.8/11.8.2/S11.8.2_A3.2_T1.2.js
 * @description Type(Primitive(x)) and Type(Primitive(y)) vary between Object object and Function object
 */

//CHECK#1
if (({} > function(){return 1}) !== ({}.toString() > function(){return 1}.toString())) {
  $ERROR('#1: ({} > function(){return 1}) === ({}.toString() > function(){return 1}.toString())');
}

//CHECK#2
if ((function(){return 1} > {}) !== (function(){return 1}.toString() > {}.toString())) {
  $ERROR('#2: (function(){return 1} > {}) === (function(){return 1}.toString() > {}.toString())');
}

//CHECK#3
if ((function(){return 1} > function(){return 1}) !== (function(){return 1}.toString() > function(){return 1}.toString())) {
  $ERROR('#3: (function(){return 1} > function(){return 1}) === (function(){return 1}.toString() > function(){return 1}.toString())');
}

//CHECK#4
if (({} > {}) !== ({}.toString() > {}.toString())) {
  $ERROR('#4: ({} > {}) === ({}.toString() > {}.toString())');
}


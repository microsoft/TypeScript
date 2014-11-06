// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The PropertyName is not really a nullLiteral
 *
 * @path ch11/11.1/11.1.5/S11.1.5_A4.2.js
 * @description Checking if execution of "var object = {null : true}" does not fail
 */

//CHECK#1
var object = {null : true};

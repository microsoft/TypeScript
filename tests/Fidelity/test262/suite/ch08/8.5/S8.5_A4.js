// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * NaN is not a keyword
 *
 * @path ch08/8.5/S8.5_A4.js
 * @description Create variable entitled NaN
 */

var NaN=1.0;
NaN='asdf';
NaN=true;
NaN=Number.NaN;


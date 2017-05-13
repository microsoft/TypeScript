// Copyright 2011 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * array.forEach can be frozen while in progress
 *
 * @path ch15/15.4/15.4.4/15.4.4.18/S15.4.4.18_A1.js
 * @description Freezes array.forEach during a forEach to see if it works
 */

['z'].forEach(function(){ Object.freeze(Array.prototype.forEach); });


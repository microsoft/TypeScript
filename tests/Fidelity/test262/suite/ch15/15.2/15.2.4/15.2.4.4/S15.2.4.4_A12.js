// Copyright 2011 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Let O be the result of calling ToObject passing the this value as the argument.
 *
 * @path ch15/15.2/15.2.4/15.2.4.4/S15.2.4.4_A12.js
 * @description Checking Object.prototype.valueOf invoked by the 'call' property.
 * @negative
 */

Object.prototype.valueOf.call(undefined);


// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch15/15.3/15.3.4/15.3.4.5/S15.3.4.5_A3.js
 * @description Function.prototype.bind must exist
 */

if (!('bind' in Function.prototype)) {
  $ERROR('Function.prototype.bind is missing');
}


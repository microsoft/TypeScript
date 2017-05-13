// Copyright 2011 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Call the comparefn passing undefined as the this value (step 13b)
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A8.js
 * @description comparefn tests that its this value is undefined
 * @onlyStrict
 */

var global = this;
[2,3].sort(function(x,y) {
  "use strict";

  if (this === global) {
    $FAIL('#1: Sort leaks global');
  }
  if (this !== undefined) {
    $FAIL('#2: Sort comparefn should be called with this===undefined. ' +
          'Actual: ' + this);
  }
  return x - y;
});


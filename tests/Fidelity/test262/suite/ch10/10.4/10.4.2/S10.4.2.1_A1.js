// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch10/10.4/10.4.2/S10.4.2.1_A1.js
 * @description Strict indirect eval should not leak top level
 * declarations into the global scope
 * @onlyStrict
 */

"use strict";
if (!('foo' in this)) {
  (1,eval)('"use strict"; var foo = 88;');
  if ('foo' in this) {
    $ERROR("Strict indirect eval leaked a top level declaration");
  }
}

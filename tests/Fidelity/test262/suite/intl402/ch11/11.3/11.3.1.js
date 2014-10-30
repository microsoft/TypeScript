// Copyright 2012 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.NumberFormat.prototype.constructor is the
 * Intl.NumberFormat.
 * @author: Roozbeh Pournader
 */

if (Intl.NumberFormat.prototype.constructor !== Intl.NumberFormat) {
    $ERROR("Intl.NumberFormat.prototype.constructor is not the same as " +
          "Intl.NumberFormat");
}


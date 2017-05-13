// Copyright 2012 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.DateTimeFormat.prototype.constructor is the
 * Intl.DateTimeFormat.
 * @author: Roozbeh Pournader
 */

if (Intl.DateTimeFormat.prototype.constructor !== Intl.DateTimeFormat) {
    $ERROR("Intl.DateTimeFormat.prototype.constructor is not the same as " +
          "Intl.DateTimeFormat");
}


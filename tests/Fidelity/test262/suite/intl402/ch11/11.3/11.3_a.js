// Copyright 2012 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.NumberFormat.prototype is an object that
 * has been initialized as an Intl.NumberFormat.
 * @author: Roozbeh Pournader
 */

// test by calling a function that would fail if "this" were not an object
// initialized as an Intl.NumberFormat
if (typeof Intl.NumberFormat.prototype.format(0) !== "string") {
    $ERROR("Intl.NumberFormat's prototype is not an object that has been " +
        "initialized as an Intl.NumberFormat");
}


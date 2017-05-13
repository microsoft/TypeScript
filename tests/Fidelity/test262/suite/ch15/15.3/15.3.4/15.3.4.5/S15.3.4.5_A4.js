// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch15/15.3/15.3.4/15.3.4.5/S15.3.4.5_A4.js
 * @description Function.prototype.bind call the original's internal
 * [[Call]] method rather than its .apply method.
 */

function foo() {}

var b = foo.bind(33, 44);
foo.apply = function() {
  $ERROR("Function.prototype.bind called original's .apply method");
};
b(55, 66);


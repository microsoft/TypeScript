// Copyright 2011 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "caller" of bound function is poisoned (step 20)
 *
 * @path ch15/15.3/15.3.4/15.3.4.5/S15.3.4.5_A1.js
 * @description A bound function should fail to find its "caller"
 * @negative TypeError
 */

function foo() { return bar.caller; }
var bar = foo.bind({});
function baz() { return bar(); }
baz();


// Copyright 2011 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "arguments" of bound function is poisoned (step 21)
 *
 * @path ch15/15.3/15.3.4/15.3.4.5/S15.3.4.5_A2.js
 * @description a bound function should fail to find the bound function "arguments"
 * @negative TypeError
 */

function foo() { return bar.arguments; }
var bar = foo.bind({});
function baz() { return bar(); }
baz();


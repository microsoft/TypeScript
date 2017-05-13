// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.NumberFormat instances have the specified properties.
 * @author Norbert Lindenberg
 */

var obj = new Intl.NumberFormat();

var toStringValue = Object.prototype.toString.call(obj);
if (toStringValue !== "[object Object]") {
    $ERROR("Intl.NumberFormat instance produces wrong [[Class]] - toString returns " + toStringValue + ".");
}


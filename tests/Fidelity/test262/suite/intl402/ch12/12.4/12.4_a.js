// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.DateTimeFormat instances have the specified properties.
 * @author Norbert Lindenberg
 */

var obj = new Intl.DateTimeFormat();

var toStringValue = Object.prototype.toString.call(obj);
if (toStringValue !== "[object Object]") {
    $ERROR("Intl.DateTimeFormat instance produces wrong [[Class]] - toString returns " + toStringValue + ".");
}


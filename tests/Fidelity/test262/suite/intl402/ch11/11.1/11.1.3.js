// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that objects constructed by Intl.NumberFormat have the specified internal properties.
 * @author Norbert Lindenberg
 */

var obj = new Intl.NumberFormat();

var actualPrototype = Object.getPrototypeOf(obj);
if (actualPrototype !== Intl.NumberFormat.prototype) {
    $ERROR("Prototype of object constructed by Intl.NumberFormat isn't Intl.NumberFormat.prototype; got " + actualPrototype);
}

if (!Object.isExtensible(obj)) {
    $ERROR("Object constructed by Intl.NumberFormat must be extensible.");
}


// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that objects constructed by Intl.DateTimeFormat have the specified internal properties.
 * @author Norbert Lindenberg
 */

var obj = new Intl.DateTimeFormat();

var actualPrototype = Object.getPrototypeOf(obj);
if (actualPrototype !== Intl.DateTimeFormat.prototype) {
    $ERROR("Prototype of object constructed by Intl.DateTimeFormat isn't Intl.DateTimeFormat.prototype; got " + actualPrototype);
}

if (!Object.isExtensible(obj)) {
    $ERROR("Object constructed by Intl.DateTimeFormat must be extensible.");
}


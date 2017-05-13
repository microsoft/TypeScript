// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that objects constructed by Intl.Collator have the specified internal properties.
 * @author Norbert Lindenberg
 */

var obj = new Intl.Collator();

var actualPrototype = Object.getPrototypeOf(obj);
if (actualPrototype !== Intl.Collator.prototype) {
    $ERROR("Prototype of object constructed by Intl.Collator isn't Intl.Collator.prototype; got " + actualPrototype);
}

if (!Object.isExtensible(obj)) {
    $ERROR("Object constructed by Intl.Collator must be extensible.");
}


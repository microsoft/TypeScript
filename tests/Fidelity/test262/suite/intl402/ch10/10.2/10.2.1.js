// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the license found in the LICENSE file.

/**
 * @description Tests that Intl.Collator.prototype has the required attributes.
 * @author Norbert Lindenberg
 */

var desc = Object.getOwnPropertyDescriptor(Intl.Collator, "prototype");
if (desc === undefined) {
    $ERROR("Intl.Collator.prototype is not defined.");
}
if (desc.writable) {
    $ERROR("Intl.Collator.prototype must not be writable.");
}
if (desc.enumerable) {
    $ERROR("Intl.Collator.prototype must not be enumerable.");
}
if (desc.configurable) {
    $ERROR("Intl.Collator.prototype must not be configurable.");
}


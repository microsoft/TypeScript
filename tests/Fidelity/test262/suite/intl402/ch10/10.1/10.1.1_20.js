// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the option sensitivity is processed correctly.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

// the fallback is variant only for usage === sort, but that happens to be the fallback for usage
testOption(Intl.Collator, "sensitivity", "string", ["base", "accent", "case", "variant"], "variant");


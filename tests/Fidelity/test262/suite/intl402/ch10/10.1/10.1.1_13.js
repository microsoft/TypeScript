// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the options numeric and caseFirst are processed correctly.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testOption(Intl.Collator, "numeric", "boolean", undefined, undefined, {isOptional: true});
testOption(Intl.Collator, "caseFirst", "string", ["upper", "lower", "false"], undefined, {isOptional: true});


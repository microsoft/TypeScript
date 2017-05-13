// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the default locale is a String value representing the
 * structurally valid and canonicalized BCP 47 language tag.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    var defaultLocale = new Constructor().resolvedOptions().locale;
    if (!isCanonicalizedStructurallyValidLanguageTag(defaultLocale)) {
        $ERROR("Default locale \"" + defaultLocale + "\" is not canonicalized and structurally valid language tag.");
    }
    return true;
});


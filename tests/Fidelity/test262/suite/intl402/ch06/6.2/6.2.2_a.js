// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that structurally valid language tags are accepted.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

var validLanguageTags = [
    "de", // ISO 639 language code
    "de-DE", // + ISO 3166-1 country code
    "DE-de", // tags are case-insensitive
    "cmn", // ISO 639 language code
    "cmn-Hans", // + script code
    "CMN-hANS", // tags are case-insensitive
    "cmn-hans-cn", // + ISO 3166-1 country code
    "es-419", // + UN M.49 region code
    "es-419-u-nu-latn-cu-bob", // + Unicode locale extension sequence
    "i-klingon", // grandfathered tag
    "cmn-hans-cn-t-ca-u-ca-x-t-u", // singleton subtags can also be used as private use subtags
    "enochian-enochian", // language and variant subtags may be the same
    "de-gregory-u-ca-gregory" // variant and extension subtags may be the same
];

testWithIntlConstructors(function (Constructor) {
    validLanguageTags.forEach(function (tag) {
        // this must not throw an exception for a valid language tag
        var obj = new Constructor([tag]);
    });
    return true;
});


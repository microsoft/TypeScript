// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that a single string instead of a locale list is treated
 *     as the locale list containing that string.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

var validAndInvalidLanguageTags = [
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
    "de-gregory-u-ca-gregory", // variant and extension subtags may be the same
    "de_DE",
    "DE_de",
    "cmn_Hans",
    "cmn-hans_cn",
    "es_419",
    "es-419-u-nu-latn-cu_bob",
    "i_klingon",
    "cmn-hans-cn-t-ca-u-ca-x_t-u",
    "enochian_enochian",
    "de-gregory_u-ca-gregory",
    "i", // singleton alone
    "x", // private use without subtag
    "u", // extension singleton in first place
    "419", // region code in first place
    "u-nu-latn-cu-bob", // extension sequence without language
    "hans-cmn-cn", // "hans" could theoretically be a 4-letter language code,
                   // but those can't be followed by extlang codes.
    "cmn-hans-cn-u-u", // duplicate singleton
    "cmn-hans-cn-t-u-ca-u", // duplicate singleton
    "de-gregory-gregory" // duplicate variant
];

testWithIntlConstructors(function (Constructor) {
    validAndInvalidLanguageTags.forEach(function (locale) {
        var obj1, obj2, locale1, locale2, error1, error2;
        try {
            obj1 = new Constructor(locale);
            locale1 = obj1.resolvedOptions().locale;
        } catch (e) {
            error1 = e;
        }
        try {
            obj2 = new Constructor([locale]);
            locale2 = obj2.resolvedOptions().locale;
        } catch (e) {
            error2 = e;
        }

        if ((error1 === undefined) !== (error2 === undefined)) {
            if (error1 === undefined) {
                $ERROR("Single locale string " + locale +
                    " was accepted, but locale list containing that string wasn't.");
            } else {
                $ERROR("Single locale string " + locale +
                    " was rejected, but locale list containing that string wasn't.");
            }
        } else if (error1 === undefined) {
             if (locale1 !== locale2) {
                $ERROR("Single locale string " + locale + " results in " + locale1 +
                    ", but locale list [" + locale + "] results in " + locale2 + ".");
             }
        } else {
            if (error1.name !== error2.name) {
                $ERROR("Single locale string " + locale + " results in error " + error1.name +
                    ", but locale list [" + locale + "] results in error " + error2.name + ".");
             }
        }
    });
    
    return true;
});


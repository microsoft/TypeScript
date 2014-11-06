// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the options numeric and caseFirst can be
 *     set through either the locale or the options.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

var options = [
    {key: "kn", property: "numeric", type: "boolean", values: [true, false]},
    {key: "kf", property: "caseFirst", type: "string", values: ["upper", "lower", "false"]}
];

options.forEach(function (option) {
    var defaultLocale = new Intl.Collator().resolvedOptions().locale;
    var collator, opt, result;
    
    // find out which values are supported for a property in the default locale
    var supportedValues = [];
    option.values.forEach(function (value) {
        opt = {};
        opt[option.property] = value;
        collator = new Intl.Collator([defaultLocale], opt);
        result = collator.resolvedOptions()[option.property];
        if (result !== undefined && supportedValues.indexOf(result) === -1) {
            supportedValues.push(result);
        }
    });
    
    // verify that the supported values can also be set through the locale
    supportedValues.forEach(function (value) {
        collator = new Intl.Collator([defaultLocale + "-u-" + option.key + "-" + value]);
        result = collator.resolvedOptions()[option.property];
        if (result !== value) {
            $ERROR("Property " + option.property + " couldn't be set through locale extension key " +
                option.key + "; requested value: " + value + "; actual value: " + result + ".");
        }
    });
    
    // verify that the options setting overrides the locale setting
    supportedValues.forEach(function (value) {
        var otherValue;
        option.values.forEach(function (possibleValue) {
            if (possibleValue !== value) {
                otherValue = possibleValue;
            }
        });
        if (otherValue !== undefined) {
            opt = {};
            opt[option.property] = value;
            collator = new Intl.Collator([defaultLocale + "-u-" + option.key + "-" + otherValue], opt);
            result = collator.resolvedOptions()[option.property];
            if (result !== value) {
                $ERROR("Options value for property " + option.property + " doesn't override locale extension key " +
                    option.key + "; requested value: " + value + "; actual value: " + result + ".");
            }
        }
    });
});


// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that String.prototype.localeCompare throws the same exceptions as Intl.Collator.
 * @author Norbert Lindenberg
 */

var locales = [null, [NaN], ["i"], ["de_DE"]];
var options = [
    {localeMatcher: null},
    {usage: "invalid"},
    {sensitivity: "invalid"}
];

locales.forEach(function (locales) {
    var referenceError, error;
    try {
        var collator = new Intl.Collator(locales);
    } catch (e) {
        referenceError = e;
    }
    if (referenceError === undefined) {
        $ERROR("Internal error: Expected exception was not thrown by Intl.Collator for locales " + locales + ".");
    }
    
    try {
        var result = "".localeCompare("", locales);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("String.prototype.localeCompare didn't throw exception for locales " + locales + ".");
    } else if (error.name !== referenceError.name) {
        $ERROR("String.prototype.localeCompare threw exception " + error.name +
            " for locales " + locales + "; expected " + referenceError.name + ".");
    }
});

options.forEach(function (options) {
    var referenceError, error;
    try {
        var collator = new Intl.Collator([], options);
    } catch (e) {
        referenceError = e;
    }
    if (referenceError === undefined) {
        $ERROR("Internal error: Expected exception was not thrown by Intl.Collator for options " +
            JSON.stringify(options) + ".");
    }
    
    try {
        var result = "".localeCompare("", [], options);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("String.prototype.localeCompare didn't throw exception for options " +
            JSON.stringify(options) + ".");
    } else if (error.name !== referenceError.name) {
        $ERROR("String.prototype.localeCompare threw exception " + error.name +
            " for options " + JSON.stringify(options) + "; expected " + referenceError.name + ".");
    }
});


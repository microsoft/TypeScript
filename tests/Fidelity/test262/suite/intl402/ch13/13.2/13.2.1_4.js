// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Number.prototype.toLocaleString throws the same exceptions as Intl.NumberFormat.
 * @author Norbert Lindenberg
 */

var locales = [null, [NaN], ["i"], ["de_DE"]];
var options = [
    {localeMatcher: null},
    {style: "invalid"},
    {style: "currency"},
    {style: "currency", currency: "ßP"},
    {maximumSignificantDigits: -Infinity}
];

locales.forEach(function (locales) {
    var referenceError, error;
    try {
        var format = new Intl.NumberFormat(locales);
    } catch (e) {
        referenceError = e;
    }
    if (referenceError === undefined) {
        $ERROR("Internal error: Expected exception was not thrown by Intl.NumberFormat for locales " + locales + ".");
    }
    
    try {
        var result = (0).toLocaleString(locales);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("Number.prototype.toLocaleString didn't throw exception for locales " + locales + ".");
    } else if (error.name !== referenceError.name) {
        $ERROR("Number.prototype.toLocaleString threw exception " + error.name +
            " for locales " + locales + "; expected " + referenceError.name + ".");
    }
});

options.forEach(function (options) {
    var referenceError, error;
    try {
        var format = new Intl.NumberFormat([], options);
    } catch (e) {
        referenceError = e;
    }
    if (referenceError === undefined) {
        $ERROR("Internal error: Expected exception was not thrown by Intl.NumberFormat for options " +
            JSON.stringify(options) + ".");
    }
    
    try {
        var result = (0).toLocaleString([], options);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("Number.prototype.toLocaleString didn't throw exception for options " +
            JSON.stringify(options) + ".");
    } else if (error.name !== referenceError.name) {
        $ERROR("Number.prototype.toLocaleString threw exception " + error.name +
            " for options " + JSON.stringify(options) + "; expected " + referenceError.name + ".");
    }
});


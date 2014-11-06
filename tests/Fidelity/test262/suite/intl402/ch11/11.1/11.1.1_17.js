// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the option currency is processed correctly.
 * @author Norbert Lindenberg
 */

var validValues = ["CNY", "USD", "EUR", "IDR", "jpy", {toString: function () {return "INR";}}];
var invalidValues = ["$", "SFr.", "US$", "ßP", {toString: function () {return;}}];

var defaultLocale = new Intl.NumberFormat().resolvedOptions().locale;

validValues.forEach(function (value) {
    var format, actual, expected;

    // with currency style, we should get the upper case form back
    format = new Intl.NumberFormat([defaultLocale], {style: "currency", currency: value});
    actual = format.resolvedOptions().currency;
    expected = value.toString().toUpperCase();
    if (actual !== expected) {
        $ERROR("Incorrect resolved currency with currency style - expected " +
            expected + "; got " + actual + ".");
    }
    
    // without currency style, we shouldn't get any currency back
    format = new Intl.NumberFormat([defaultLocale], {currency: value});
    actual = format.resolvedOptions().currency;
    expected = undefined;
    if (actual !== expected) {
        $ERROR("Incorrect resolved currency with non-currency style - expected " +
            expected + "; got " + actual + ".");
    }
    
    // currencies specified through the locale must be ignored
    format = new Intl.NumberFormat([defaultLocale + "-u-cu-krw"], {style: "currency", currency: value});
    actual = format.resolvedOptions().currency;
    expected = value.toString().toUpperCase();
    if (actual !== expected) {
        $ERROR("Incorrect resolved currency with -u-cu- and currency style - expected " +
            expected + "; got " + actual + ".");
    }
    
    format = new Intl.NumberFormat([defaultLocale + "-u-cu-krw"], {currency: value});
    actual = format.resolvedOptions().currency;
    expected = undefined;
    if (actual !== expected) {
        $ERROR("Incorrect resolved currency with -u-cu- and non-currency style - expected " +
            expected + "; got " + actual + ".");
    }
});

invalidValues.forEach(function (value) {
    function expectError(f) {
        var error;
        try {
            f();
        } catch (e) {
            error = e;
        }
        if (error === undefined) {
            $ERROR("Invalid currency value " + value + " was not rejected.");
        } else if (error.name !== "RangeError") {
            $ERROR("Invalid currency value " + value + " was rejected with wrong error " + error.name + ".");
        }
    }

    expectError(function () {
            return new Intl.NumberFormat([defaultLocale], {style: "currency", currency: value});
    });
    expectError(function () {
            return new Intl.NumberFormat([defaultLocale], {currency: value});
    });
    expectError(function () {
            return new Intl.NumberFormat([defaultLocale + "-u-cu-krw"], {style: "currency", currency: value});
    });
    expectError(function () {
            return new Intl.NumberFormat([defaultLocale + "-u-cu-krw"], {currency: value});
    });
});


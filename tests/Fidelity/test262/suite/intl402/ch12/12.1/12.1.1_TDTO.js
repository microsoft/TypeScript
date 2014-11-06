// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the set of options for the date and time components is processed correctly.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

var locales = [[], ["zh-Hans-CN"], ["hi-IN"], ["en-US"], ["id-ID"]];
var dates = [new Date(), new Date(0), new Date(Date.parse("1989-11-09T17:57:00Z"))];

function testWithDateTimeFormat(options, expected) {
    locales.forEach(function (locales) {
        var format = new Intl.DateTimeFormat(locales, options);
        var resolvedOptions = format.resolvedOptions();
        getDateTimeComponents().forEach(function (component) {
            if (resolvedOptions.hasOwnProperty(component)) {
                if (!expected.hasOwnProperty(component)) {
                    $ERROR("Unrequested component " + component +
                        " added to expected subset " + JSON.stringify(expected) +
                        "; locales " + locales + ", options " +
                        (options ? JSON.stringify(options) : options) + ".");
                }
            } else {
                if (expected.hasOwnProperty(component)) {
                    $ERROR("Missing component " + component +
                        " from expected subset " + JSON.stringify(expected) +
                        "; locales " + locales + ", options " +
                        (options ? JSON.stringify(options) : options) + ".");
                }
            }
        });
    });
}

function testWithToLocale(f, options, expected) {
    // expected can be either one subset or an array of possible subsets
    if (expected.length === undefined) {
        expected = [expected];
    }
    locales.forEach(function (locales) {
        dates.forEach(function (date) {
            var formatted = Date.prototype[f].call(date, locales, options);
            var expectedStrings = [];
            expected.forEach(function (expected) {
                var referenceFormat = new Intl.DateTimeFormat(locales, expected);
                expectedStrings.push(referenceFormat.format(date));
            });
            if (expectedStrings.indexOf(formatted) === -1) {
                $ERROR("Function " + f + " did not return expected string for locales " +
                    locales + ", options " + (options? JSON.stringify(options) : options) +
                    "; expected " +
                    (expectedStrings.length === 1 ? expectedStrings[0] : "one of " + expectedStrings) +
                    ", got " + formatted + ".");
            }
        });
    });
}   

// any/date: steps 5a, 6a, 7a
testWithDateTimeFormat(undefined, {year: "numeric", month: "numeric", day: "numeric"});

// any/date: steps 5a, 6a
testWithDateTimeFormat({year: "numeric", month: "numeric"}, {year: "numeric", month: "numeric"});

// any/date: steps 5a, 6a
testWithDateTimeFormat({hour: "numeric", minute: "numeric"}, {hour: "numeric", minute: "numeric"});

// any/all: steps 5a, 6a, 7a, 8a
testWithToLocale("toLocaleString", undefined, [
        // the first one is not guaranteed to be supported; the second one is
        {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"},
        {weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"}
]);

// any/all: steps 5a, 6a
testWithToLocale("toLocaleString", {year: "numeric", month: "numeric"}, {year: "numeric", month: "numeric"});

// any/all: steps 5a, 6a
testWithToLocale("toLocaleString", {hour: "numeric", minute: "numeric"}, {hour: "numeric", minute: "numeric"});

// date/date: steps 5a, 7a
testWithToLocale("toLocaleDateString", undefined, {year: "numeric", month: "numeric", day: "numeric"});

// date/date: steps 5a
testWithToLocale("toLocaleDateString", {year: "numeric", month: "numeric"}, {year: "numeric", month: "numeric"});

// date/date: steps 5a, 7a
testWithToLocale("toLocaleDateString", {hour: "numeric", minute: "numeric", second: "numeric"}, [
        // the first one is not guaranteed to be supported; the second one is
        {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"},
        {weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"}
]);

// time/time: steps 6a, 8a
testWithToLocale("toLocaleTimeString", undefined, {hour: "numeric", minute: "numeric", second: "numeric"});

// time/time: steps 6a, 8a
testWithToLocale("toLocaleTimeString", {weekday: "short", year: "numeric", month: "numeric", day: "numeric"},
    {weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"});

// time/time: steps 6a
testWithToLocale("toLocaleTimeString", {hour: "numeric", minute: "numeric"}, {hour: "numeric", minute: "numeric"});



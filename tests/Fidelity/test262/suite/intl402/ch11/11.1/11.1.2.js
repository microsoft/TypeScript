// Copyright 2011-2012 Norbert Lindenberg. All rights reserved.
// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Intl.NumberFormat can be subclassed.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

// get a number format and have it format an array of numbers for comparison with the subclass
var locales = ["tlh", "id", "en"];
var a = [0, 1, -1, -123456.789, -Infinity, NaN];
var referenceNumberFormat = new Intl.NumberFormat(locales);
var referenceFormatted = a.map(referenceNumberFormat.format);

function MyNumberFormat(locales, options) {
    Intl.NumberFormat.call(this, locales, options);
    // could initialize MyNumberFormat properties
}

MyNumberFormat.prototype = Object.create(Intl.NumberFormat.prototype);
MyNumberFormat.prototype.constructor = MyNumberFormat;
// could add methods to MyNumberFormat.prototype

var format = new MyNumberFormat(locales);
var actual = a.map(format.format);
testArraysAreSame(referenceFormatted, actual);


// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that format function is bound to its Intl.NumberFormat.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

var numbers = [0, -0, 1, -1, 5.5, 123, -123, -123.45, 123.44501, 0.001234,
    -0.00000000123, 0.00000000000000000000000000000123, 1.2, 0.0000000012344501,
    123445.01, 12344501000000000000000000000000000, -12344501000000000000000000000000000,
    Infinity, -Infinity, NaN];
var locales = [undefined, ["de"], ["th-u-nu-thai"], ["en"], ["ja-u-nu-jpanfin"], ["ar-u-nu-arab"]];
var options = [
    undefined,
    {style: "percent"},
    {style: "currency", currency: "EUR", currencyDisplay: "symbol"},
    {style: "currency", currency: "IQD", currencyDisplay: "symbol"},
    {style: "currency", currency: "KMF", currencyDisplay: "symbol"},
    {style: "currency", currency: "CLF", currencyDisplay: "symbol"},
    {useGrouping: false, minimumIntegerDigits: 3, minimumFractionDigits: 1, maximumFractionDigits: 3}
];

locales.forEach(function (locales) {
    options.forEach(function (options) {
        var formatObj = new Intl.NumberFormat(locales, options);
        var formatFunc = formatObj.format;
        numbers.forEach(function (number) {
            var referenceFormatted = formatObj.format(number);
            var formatted = formatFunc(number);
            if (referenceFormatted !== formatted) {
                $ERROR("format function produces different result than format method for locales " +
                    locales + "; options: " + (options ? JSON.stringify(options) : options) +
                    " : " + formatted + " vs. " + referenceFormatted + ".");
            }
        });
    });
});


// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the license found in the LICENSE file.

/**
 * @description Tests that Intl.DateTimeFormat provides the required date-time
 *     format component subsets.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

var locales = ["de-DE", "en-US", "hi-IN", "id-ID", "ja-JP", "th-TH", "zh-Hans-CN", "zh-Hant-TW", "zxx"];
var subsets = [
    {weekday: "long", year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric"},
    {weekday: "long", year: "numeric", month: "numeric", day: "numeric"},
    {year: "numeric", month: "numeric", day: "numeric"},
    {year: "numeric", month: "numeric"},
    {month: "numeric", day: "numeric"},
    {hour: "numeric", minute: "numeric", second: "numeric"},
    {hour: "numeric", minute: "numeric"}
];

locales.forEach(function (locale) {
    subsets.forEach(function (subset) {
        var format = new Intl.DateTimeFormat([locale], subset);
        var actual = format.resolvedOptions();
        getDateTimeComponents().forEach(function (component) {
            if (actual.hasOwnProperty(component)) {
                if (!subset.hasOwnProperty(component)) {
                    $ERROR("Unrequested component " + component +
                        " added to requested subset " + JSON.stringify(subset) +
                        "; locale " + locale + ".");
                }
                try {
                    testValidDateTimeComponentValue(component, actual[component]);
                } catch (e) {
                    e.message += " (Testing locale " + locale + "; subset " +
                        JSON.stringify(subset) + ")";
                    throw e;
                }
            } else {
                if (subset.hasOwnProperty(component)) {
                    $ERROR("Missing component " + component +
                        " from requested subset " + JSON.stringify(subset) +
                        "; locale " + locale + ".");
                }
            }
        });
    });
});


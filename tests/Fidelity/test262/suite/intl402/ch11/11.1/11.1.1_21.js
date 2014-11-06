// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the option currencyDisplay is processed correctly.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testOption(Intl.NumberFormat, "currencyDisplay", "string", ["code", "symbol", "name"],
    "symbol", {extra: {any: {style: "currency", currency: "XDR"}}});
testOption(Intl.NumberFormat, "currencyDisplay", "string", ["code", "symbol", "name"],
    undefined, {noReturn: true});

